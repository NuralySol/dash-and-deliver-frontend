const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const fetchData = async (endpoint, options = {}) => {
  try {
    const fullUrl = `${BASE_URL}${endpoint}`;
    options.headers = options.headers || {};

    const token = localStorage.getItem('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorData = {};

      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData.message = await response.text();
      }

      console.error('Error Response:', errorData);
      throw new Error(errorData.message || 'An error occurred');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};