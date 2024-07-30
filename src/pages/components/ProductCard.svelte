<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cart } from '../../store/stores';

  export let id: number;
  export let title: string;
  export let image: string;
  export let price: number;
  export let rating: { rate: number, count: number };
  export let category: string;
  export let description: string;
  export let showDescription: boolean = false;

  const dispatch = createEventDispatcher();

  const addToCart = () => {
    cart.update(items => {
      const existingItem = items.find(item => item.id === id);
      if (existingItem) {
        return items.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { id, title, image, price, rating, category, quantity: 1 }];
      }
    });
  };

  const addToWishlist = () => {
    // Wishlist functionality if needed
  };

  const handleClick = () => {
    dispatch('click', { id, title, image, price, rating, category });
  };
</script>

<div class="p-4 max-w-xs mx-auto bg-white border border-gray-300 rounded-lg shadow" on:click={handleClick}>
  <img src={image} alt={title} class="h-48 bg-gray-300 rounded-t-lg" />
  <div class="p-4">
    <h2 class="text-lg font-bold mb-2">{title}</h2>
    <p class="mb-2">{category}</p>
    <p class="mb-2">${price}</p>
    <p class="mb-2">{rating.rate} ({rating.count} reviews)</p>
    {#if showDescription}
      <p class="mb-2">{description}</p>
    {/if}
    <div class="flex justify-between">
      <button on:click|stopPropagation={addToCart} class="px-4 py-2 bg-green-500 text-white rounded">Add to Cart</button>
      <button on:click|stopPropagation={addToWishlist} class="px-4 py-2 bg-blue-500 text-white rounded">Add to Wishlist</button>
    </div>
  </div>
</div>

<style>
  button {
    cursor: pointer;
  }
</style>
