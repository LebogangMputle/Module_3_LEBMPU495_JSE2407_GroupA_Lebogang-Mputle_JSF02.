<script>
  export let id;
  export let title;
  export let image;
  export let price;
  export let rating;
  export let category;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click', { id, title, image, price, rating, category });
  };

  const addToWishlist = (event) => {
    event.stopPropagation();
    console.log(`Added ${title} to wishlist`);
  };

  const addToCart = (event) => {
    event.stopPropagation();
    console.log(`Added ${title} to cart`);
  };
</script>

<div class="product-card p-4 max-w-xs mx-auto bg-gray-200 border border-gray-300 rounded-lg shadow cursor-pointer" on:click={handleClick}>
  <img src={image} alt={title} class="h-48 bg-gray-300 rounded-t-lg" />
  <div class="p-4">
    <h2 class="text-lg font-bold mb-2">{title}</h2>
    <p class="mb-2">Category: {category}</p>
    <p class="mb-2">Price: ${price}</p>
    <p class="mb-2">Rating: {rating.rate} ({rating.count} reviews)</p>
    <button class="mr-2 bg-blue-500 text-white px-2 py-1 rounded" on:click={addToWishlist}>Add to Wishlist</button>
    <button class="bg-green-500 text-white px-2 py-1 rounded" on:click={addToCart}>Add to Cart</button>
  </div>
</div>

<style>
  .product-card {
    cursor: pointer;
  }
</style>
