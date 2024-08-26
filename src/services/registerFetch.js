import { fetchData } from "./loginFetch";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const registerUser = async (userData) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  
  try {
    const response = await fetchData(`${BASE_URL}/auth/register`, options);
    console.log('Registration successful:', response);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};