const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

// Generic function to make API requests
export const fetchData = async (endpoint, options = {}) => {
  try {
    // Combine BASE_URL with endpoint
    const fullUrl = `${BASE_URL}${endpoint}`;
    console.log('Fetching data from:', fullUrl); // Debugging log for the URL

    // Initialize headers if not provided
    options.headers = options.headers || {};

    // Add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, options);

    console.log('Response status:', response.status); // Log the response status

    // Check if the response is not ok (e.g., 4xx or 5xx status codes)
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorData = {};

      // Parse error response as JSON if possible
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData.message = await response.text(); // Handle non-JSON error messages
      }

      console.error('Error Response:', errorData); // Log the error response
      throw new Error(errorData.message || 'An error occurred');
    }

    // Return the parsed JSON response
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials), // Convert credentials object to JSON string
  };

  // Call fetchData with the login endpoint and options
  const response = await fetchData('/auth/login', options);

  // If a token is returned, store it for future use
  if (response.token) {
    localStorage.setItem('token', response.token);
  }

  return response;
};