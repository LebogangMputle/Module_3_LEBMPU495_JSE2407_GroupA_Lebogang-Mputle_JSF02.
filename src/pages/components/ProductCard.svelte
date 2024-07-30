<script>
  export let id;
  export let title;
  export let image;
  export let price;
  export let rating;
  export let category;

  // Emit the click event
  const handleClick = () => {
    dispatch('click', { id, title, image, price, rating, category });
  };

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="product-card" on:click={handleClick}>
  <img src={image} alt={title} />
  <h2>{title}</h2>
  <p>Category: {category}</p>
  <p>Price: ${price}</p>
  <p>Rating: {rating.rate} ({rating.count} reviews)</p>
</div>

<style>
  /* Add your styles here */
</style>
