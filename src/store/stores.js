import { writable } from 'svelte/store';

const products = writable([]);
const loading = writable(true);
const error = writable(null);
export const cart = writable([]);
export const wishlist = writable([]);

export function useProductStore(selector) {
  return {
    products: selector({ products: products, loading: loading, error: error }).products,
    loading: selector({ products: products, loading: loading, error: error }).loading,
    error: selector({ products: products, loading: loading, error: error }).error
  };
}

// Example of setting the store values (can be adjusted based on actual API calls)
export function fetchProducts() {
  loading.set(true);
  error.set(null);

  // Simulate an API call
  setTimeout(() => {
    products.set([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]); // Example products
    loading.set(false);
  }, 2000);
}
