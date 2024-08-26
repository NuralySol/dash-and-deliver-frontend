const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

// Generic function to make API requests
export const fetchData = async (endpoint, options) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Function to log in a user
export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };

  return await fetchData('/auth/login', options);
};