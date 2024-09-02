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
    return await fetchData(endpoint, options);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};