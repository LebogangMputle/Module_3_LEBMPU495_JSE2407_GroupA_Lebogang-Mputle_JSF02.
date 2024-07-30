<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Wishlist from './pages/Wishlist.svelte';
  import Cart from './pages/Cart.svelte';
  import Login from './pages/Login.svelte';
</script>

<Router>


  <!-- Define routes for each page -->
  <Route path="/" component={Home} />
  <Route path="/wishlist" component={Wishlist} />
  <Route path="/cart" component={Cart} />
  <Route path="/login" component={Login} />
</Router>
