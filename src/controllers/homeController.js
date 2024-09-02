import * as apiFetch from '../services/homeFetch.js';

export const fetchDataController = async (setData, setError) => {
    try {
        const data = await apiFetch.getData(); 
        setData(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); 
    }
};