<script>
    export let message = "An error occurred";
  </script>
  
  <div class="p-4 max-w-xl mx-auto bg-red-200 border border-red-400 rounded-lg shadow">
    <h2 class="text-red-800 text-lg font-bold">Error</h2>
    <p class="text-red-700">{message}</p>
  </div>
  
  <style>
    /* Styles for the error message */
    .bg-red-200 {
      background-color: #fee2e2;
    }
    .border-red-400 {
      border-color: #f87171;
    }
    .text-red-800 {
      color: #b91c1c;
    }
    .text-red-700 {
      color: #dc2626;
    }
  </style>
  