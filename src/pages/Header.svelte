<script>
  import { Link } from 'svelte-routing';
</script>

<header class="sticky z-50 top-0">
  <nav class="bg-gray-500 border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/">
        <button class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/online-shop.png" class="h-8" alt="Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
            SwiftCart
          </span>
        </button>
      </Link>
      <div class="hidden w-full md:block md:w-auto">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <Link
              to="/wishlist"
              class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
