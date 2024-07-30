<script>
    let cartItems = [
      { id: 1, name: 'Product 1', price: 10.00, quantity: 1 },
      { id: 2, name: 'Product 2', price: 15.00, quantity: 2 },
      { id: 3, name: 'Product 3', price: 7.50, quantity: 1 }
    ];
  
    const removeItem = (id) => {
      cartItems = cartItems.filter(item => item.id !== id);
    };
  
    const updateQuantity = (id, amount) => {
      cartItems = cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      );
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };
  </script>
  
  <style>
    .cart {
      padding: 1rem;
      max-width: 600px;
      margin: auto;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .cart-item button {
      background: red;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .cart-item button:hover {
      background: darkred;
    }
    .total {
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 1rem;
    }
  </style>
  
  <div class="cart">
    <h1 class="text-2xl font-bold mb-4">Cart</h1>
    {#if cartItems.length === 0}
      <p>Your cart is empty.</p>
    {/if}
    {#each cartItems as item (item.id)}
      <div class="cart-item">
        <span>{item.name} - ${item.price.toFixed(2)}</span>
        <div>
          <button on:click={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1}>-</button>
          <span>{item.quantity}</span>
          <button on:click={() => updateQuantity(item.id, 1)}>+</button>
          <button on:click={() => removeItem(item.id)}>Remove</button>
        </div>
      </div>
    {/each}
    <div class="total">
      Total: ${calculateTotal()}
    </div>
  </div>
  