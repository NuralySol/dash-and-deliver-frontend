const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`.replace(/\/+$/, '');

export const fetchData = async (endpoint, options = {}) => {
  try {
    const fullUrl = `${BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error Response:', errorData);
      throw new Error(errorData.message || 'An error occurred');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };

  const response = await fetchData('/auth/login', options);

  if (response.token) {
    localStorage.setItem('token', response.token);
  }

  return response;
};