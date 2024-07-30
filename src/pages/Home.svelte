<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import ProductCard from './components/ProductCard.svelte';
    import CardSkeleton from './components/CardSkeleton.svelte';
    import Error from './components/Error.svelte';
    
    let products = [];
    let loading = true;
    let error = null;
    const logoUrl = '/online-shop.png'; // Your logo URL
  
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
  </script>
  
  <main>
    <header class="sticky top-0 z-50 bg-gray-500 p-4 flex justify-between items-center">
      <button on:click={handleLogoClick} class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoUrl} alt="Logo" class="h-8" />
        <span class="text-2xl font-semibold text-white">SwiftCart</span>
      </button>
    </header>
  
    <div class="p-4">
      {#if loading}
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
              <ProductCard {...product} />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </main>
  
  <style>
    /* Add any additional styles here */
  </style>
  