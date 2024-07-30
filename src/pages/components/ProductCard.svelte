<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cart, wishlist } from '../../store/stores';

  export let id: number;
  export let title: string;
  export let image: string;
  export let price: number;
  export let rating: { rate: number, count: number };
  export let category: string;
  export let description: string; // Ensure description is included

  const dispatch = createEventDispatcher();

  const addToCart = () => {
    cart.update(items => [...items, { id, title, image, price, rating, category, description }]);
  };

  const addToWishlist = () => {
    wishlist.update(items => [...items, { id, title, image, price, rating, category, description }]);
  };

  const handleClick = () => {
    dispatch('click', { id, title, image, price, rating, category, description });
  };
</script>

<div class="p-4 max-w-xs mx-auto bg-white border border-gray-300 rounded-lg shadow" on:click={handleClick}>
  <img src={image} alt={title} class="h-48 bg-gray-300 rounded-t-lg" />
  <div class="p-4">
    <h2 class="text-lg font-bold mb-2">{title}</h2>
    <p class="mb-2">Category: {category}</p>
    <p class="mb-2">Price: ${price}</p>
    <p class="mb-2">Rating: {rating.rate} ({rating.count} reviews)</p>
    <div class="flex justify-between">
      <button on:click|stopPropagation={addToCart} class="px-4 py-2 bg-green-500 text-white rounded">Add to Cart</button>
      <button on:click|stopPropagation={addToWishlist} class="px-4 py-2 bg-blue-500 text-white rounded">Add to Wishlist</button>
    </div>
  </div>
</div>
