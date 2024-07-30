<script lang="ts">
  import { onMount } from 'svelte';
  import { cart } from '../store/stores';
  import ProductCard from './components/ProductCard.svelte';
  import Error from './components/Error.svelte';
  import CardSkeleton from './components/CardSkeleton.svelte';

  let products = [];
  let displayedProducts = [];
  let loading = true;
  let error = null;
  let selectedProduct = null;
  let sortOption = 'az';
  let filterCategory = '';
  let searchQuery = '';

  onMount(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      products = await response.json();
      displayedProducts = [...products];
      sortProducts();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const handleProductClick = async (productId: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      selectedProduct = await response.json();
    } catch (err) {
      error = err.message;
    }
  };

  const goBack = () => {
    selectedProduct = null;
  };

  const sortProducts = () => {
    displayedProducts = [...products]
      .filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(product => !filterCategory || product.category === filterCategory);

    if (sortOption === 'az') {
      displayedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'za') {
      displayedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
  };

  const handleSortChange = (event) => {
    sortOption = event.target.value;
    sortProducts();
  };

  const handleCategoryChange = (event) => {
    filterCategory = event.target.value;
    sortProducts();
  };

  const handleSearchChange = (event) => {
    searchQuery = event.target.value;
    sortProducts();
  };

  const addToCart = (product) => {
    cart.update(items => {
      const itemInCart = items.find(item => item.id === product.id);
      if (itemInCart) {
        return items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };
</script>

<main>
  <div class="p-4">
    {#if selectedProduct}
      <button on:click={goBack} class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
      <ProductCard 
        id={selectedProduct.id} 
        title={selectedProduct.title} 
        image={selectedProduct.image} 
        price={selectedProduct.price} 
        rating={selectedProduct.rating} 
        category={selectedProduct.category} 
        description={selectedProduct.description} 
        showDescription={true} />
    {:else if loading}
      <div class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {#each Array(20).fill(null) as _, index}
            <CardSkeleton key={index} />
          {/each}
        </div>
      </div>
    {:else if error}
      <div class="grid justify-center">
        <Error message={error} />
      </div>
    {:else}
      <div class="flex justify-between items-center mb-4">
        <div>
          <label for="sort" class="mr-2">Sort by:</label>
          <select id="sort" on:change={handleSortChange} bind:value={sortOption} class="border border-blue-300 rounded p-1">
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
        <div>
          <label for="category" class="mr-2">Filter by category:</label>
          <select id="category" on:change={handleCategoryChange} bind:value={filterCategory} class="border border-blue-300 rounded p-1">
            <option value="">All</option>
            {#each [...new Set(products.map(product => product.category))] as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
        <div>
          <input type="text" placeholder="Search" on:input={handleSearchChange} bind:value={searchQuery} class="border border-blue-300 rounded p-1" />
        </div>
      </div>
      <div class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {#each displayedProducts as product (product.id)}
            <ProductCard 
              id={product.id} 
              title={product.title} 
              image={product.image} 
              price={product.price} 
              rating={product.rating} 
              category={product.category} 
              description={product.description} 
              showDescription={false}
              on:click={() => handleProductClick(product.id)} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  button {
    cursor: pointer;
  }
</style>
