import { fetchData } from "./loginFetch";

export const registerUser = async (userData) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  const endpoint = `/auth/register`;
  try {
    const response = await fetchData(endpoint, options); 
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};