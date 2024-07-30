<script lang="ts">
  import { onMount } from 'svelte';
  import { cart } from '../store/stores'; // Import the cart store

  let cartItems = [];

  // Fetch cart items from the store
  $: {
    cartItems = $cart;
  }

  const removeItem = (id: number) => {
    cart.update(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, amount: number) => {
    cart.update(items => items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Clear cart items when navigating to this page
  onMount(() => {
    cart.set([]);
  });
</script>

<style>
  .cart {
    padding: 1rem;
    max-width: 1200px;
    margin: auto;
  }
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    background: white;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }
  .cart-item img {
    max-width: 150px;
    margin-right: 1rem;
  }
  .cart-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .cart-item-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cart-item button {
    background: red;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  .cart-item button:hover {
    background: darkred;
  }
  .quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }
  .quantity-controls button {
    background: gray;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .quantity-controls button:hover {
    background: darkgray;
  }
  .quantity-controls span {
    margin: 0 0.5rem;
  }
  .total {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1rem;
    text-align: right;
  }
</style>

<main class="cart">
  <h1 class="text-2xl font-bold mb-4">Cart</h1>
  {#if cartItems.length === 0}
    <p>Your cart is empty.</p>
  {/if}
  {#each cartItems as item (item.id)}
    <div class="cart-item">
      <img src={item.image} alt={item.title} />
      <div class="cart-item-info">
        <h2 class="text-lg font-bold">{item.title}</h2>
        <p class="mb-2">{item.category}</p>
        <p class="mb-2">Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
        <p class="mb-2">Price: ${item.price.toFixed(2)}</p>
        <p class="mb-2">{item.description}</p>
        <div class="quantity-controls">
          <button on:click={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1}>-</button>
          <span>{item.quantity}</span>
          <button on:click={() => updateQuantity(item.id, 1)}>+</button>
        </div>
      </div>
      <div class="cart-item-buttons">
        <button on:click={() => removeItem(item.id)}>Remove</button>
      </div>
    </div>
  {/each}
  <div class="total">
    Total: ${calculateTotal()}
  </div>
</main>
