// Set up BASE_URL from environment variable
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`.replace(/\/+$/, ''); // Ensure no trailing slash

// Generic function to make API requests
export const fetchData = async (endpoint, options = {}) => {
  try {
    // Combine BASE_URL with endpoint
    const fullUrl = `${BASE_URL}${endpoint}`;
    console.log('Fetching data from:', fullUrl); // Debugging log for the URL

    // Add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    const response = await fetch(fullUrl, options);

    console.log('Response status:', response.status); // Log the response status

    // Check if the response is not ok (e.g., 4xx or 5xx status codes)
    if (!response.ok) {
      const errorData = await response.json();
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