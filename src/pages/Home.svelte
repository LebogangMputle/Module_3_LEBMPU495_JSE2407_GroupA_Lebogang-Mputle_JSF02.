<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import Error from './components/Error.svelte';
  import CardSkeleton from './components/CardSkeleton.svelte';
  import ProductCard from './components/ProductCard.svelte';
  
  let products = [];
  let displayedProducts = [];
  let loading = true;
  let error = null;
  let selectedProduct = null;
  let sortOption = 'az';
  let filterCategory = '';
  let searchQuery = '';

  // Fetch products from the Fake Store API
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

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProductClick = (event) => {
    selectedProduct = event.detail;
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
</script>

<main>
  <div class="p-4">
    {#if selectedProduct}
      <button on:click={goBack} class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
      <div class="p-4 max-w-xs mx-auto bg-gray-200 border border-gray-300 rounded-lg shadow">
        <img src={selectedProduct.image} alt={selectedProduct.title} class="h-48 bg-gray-300 rounded-t-lg" />
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">{selectedProduct.title}</h2>
          <p class="mb-2">Category: {selectedProduct.category}</p>
          <p class="mb-2">Price: ${selectedProduct.price}</p>
          <p class="mb-2">Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
          <p class="mb-2">Description: {selectedProduct.description}</p>
        </div>
      </div>
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
          <select id="sort" on:change={handleSortChange} bind:value={sortOption}>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
        <div>
          <label for="category" class="mr-2">Filter by category:</label>
          <select id="category" on:change={handleCategoryChange} bind:value={filterCategory}>
            <option value="">All</option>
            {#each [...new Set(products.map(product => product.category))] as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
        <div>
          <input type="text" placeholder="Search" on:input={handleSearchChange} bind:value={searchQuery} />
        </div>
      </div>
      <div class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {#each displayedProducts as product (product.id)}
            <ProductCard {...product} on:click={handleProductClick} />
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
