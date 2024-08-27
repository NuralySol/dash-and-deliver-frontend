// Set up BASE_URL from environment variable
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`.replace(/\/+$/, ''); // Ensure no trailing slash

// Generic function to make API requests
export const fetchData = async (endpoint, options = {}) => {
  try {
    // Combine BASE_URL with endpoint
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Check if the response is not ok (e.g., 4xx or 5xx status codes)
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response
      throw new Error(errorData.message || 'An error occurred'); // Throw error with message
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

// Function to fetch protected data
export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token'); // Retrieve JWT from localStorage

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Send JWT in Authorization header
    },
  };

  return await fetchData('/protected-endpoint', options); // Replace with actual endpoint
};