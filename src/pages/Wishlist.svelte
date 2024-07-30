<script>
    let items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];
  
    const removeItem = (id) => {
      items = items.filter(item => item.id !== id);
    };
  </script>
  
  <style>
    .wishlist {
      padding: 1rem;
      max-width: 600px;
      margin: auto;
    }
    .wishlist-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .wishlist-item button {
      background: red;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .wishlist-item button:hover {
      background: darkred;
    }
  </style>
  
  <div class="wishlist">
    <h1 class="text-2xl font-bold mb-4">Wishlist</h1>
    {#if items.length === 0}
      <p>Your wishlist is empty.</p>
    {/if}
    {#each items as item (item.id)}
      <div class="wishlist-item">
        <span>{item.name}</span>
        <button on:click={() => removeItem(item.id)}>Remove</button>
      </div>
    {/each}
  </div>
  