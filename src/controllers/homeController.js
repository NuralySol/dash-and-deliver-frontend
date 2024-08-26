import * as apiFetch from '../services/homeFetch.js';

export const fetchDataController = async (setData, setError) => {
    try {
        const data = await apiFetch.getData(); // Fetch data from the API
        setData(data); // Update state with the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Optionally, update state with the error message
    }
};