import { fetchData } from "./loginFetch";

// Set up BASE_URL from environment variable
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`.replace(/\/+$/, ''); // Ensure no trailing slash

export const registerUser = async (userData) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  // Construct the full URL for the registration endpoint
  const fullUrl = `${BASE_URL}/auth/register`;

  // Debugging: Log the BASE_URL and fullUrl before making the request
  console.log(`BASE_URL: ${BASE_URL}`);
  console.log(`Making request to: ${fullUrl}`);

  try {
    const response = await fetchData(fullUrl, options);
    console.log('Registration successful:', response);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};