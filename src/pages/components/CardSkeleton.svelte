<script>
    // No script necessary for the skeleton, as it's just a placeholder
  </script>
  
  <div class="p-4 max-w-xs mx-auto bg-gray-200 border border-gray-300 rounded-lg shadow animate-pulse">
    <div class="h-48 bg-gray-300 rounded-t-lg"></div>
    <div class="p-4">
      <div class="h-6 bg-gray-300 rounded mb-4"></div>
      <div class="h-4 bg-gray-300 rounded mb-2"></div>
      <div class="h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
  
  <style>
    /* Styles for the skeleton loader */
    .animate-pulse {
      animation: pulse 1.5s infinite ease-in-out;
    }
  
    @keyframes pulse {
      0% {
        background-color: #f3f3f3;
      }
      50% {
        background-color: #e0e0e0;
      }
      100% {
        background-color: #f3f3f3;
      }
    }
  </style>
  