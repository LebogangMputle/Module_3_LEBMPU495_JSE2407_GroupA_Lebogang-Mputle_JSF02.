<script>
    let email = '';
    let password = '';
    let error = '';
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password) {
        error = 'Please fill in both fields.';
        return;
      }
      // Simulate login (replace this with actual login logic)
      console.log('Email:', email);
      console.log('Password:', password);
      error = '';
      // Redirect or handle successful login here
    };
  </script>
  
  <style>
    .login-form {
      max-width: 400px;
      margin: auto;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .login-form h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .login-form label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .login-form input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
    }
    .login-form button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .login-form button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-bottom: 1rem;
    }
  </style>
  
  <div class="login-form">
    <h1>Login</h1>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    <form on:submit={handleSubmit}>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} placeholder="Email" />
  
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} placeholder="Password" />
  
      <button type="submit">Login</button>
    </form>
  </div>
  