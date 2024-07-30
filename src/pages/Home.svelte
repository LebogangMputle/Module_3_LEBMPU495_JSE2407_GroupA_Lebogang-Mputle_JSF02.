<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import Error from './components/Error.svelte';
  import CardSkeleton from './components/CardSkeleton.svelte';
  import ProductCard from './components/ProductCard.svelte';
  
  let products = [];
  let loading = true;
  let error = null;
  let selectedProduct = null;

  // Fetch products from the Fake Store API
  onMount(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      products = await response.json();
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
</script>

<main>
  <div class="p-4">
    {#if selectedProduct}
      <div class="p-4 max-w-xs mx-auto bg-gray-200 border border-gray-300 rounded-lg shadow">
        <img src={selectedProduct.image} alt={selectedProduct.title} class="h-48 bg-gray-300 rounded-t-lg" />
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">{selectedProduct.title}</h2>
          <p class="mb-2">Category: {selectedProduct.category}</p>
          <p class="mb-2">Price: ${selectedProduct.price}</p>
          <p class="mb-2">Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
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
      <div class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {#each products as product (product.id)}
            <ProductCard {...product} on:click={handleProductClick} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  /* Add any additional styles here */
</style>
