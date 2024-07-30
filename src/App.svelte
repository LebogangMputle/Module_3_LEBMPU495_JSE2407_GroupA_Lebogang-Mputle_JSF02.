<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Header from './lib/Header.svelte'; // Import Header component
  import Home from './pages/Home.svelte';
  import Wishlist from './pages/Wishlist.svelte';
  import Cart from './pages/Cart.svelte';
  import Login from './pages/Login.svelte';
</script>

<Router>
  <Header /> <!-- Include the Header component for consistent navigation -->

  <nav>
    <Link to="/">Home</Link>
    <Link to="/wishlist">Wishlist</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/login">Login</Link>
  </nav>

  <!-- Define routes for each page -->
  <Route path="/" component={Home} />
  <Route path="/wishlist" component={Wishlist} />
  <Route path="/cart" component={Cart} />
  <Route path="/login" component={Login} />
</Router>
