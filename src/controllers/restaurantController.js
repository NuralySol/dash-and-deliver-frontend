import { useState, useEffect } from 'react';
import { getRestaurants } from '../services/restaurantFetch.js';

export const RestaurantsController = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getRestaurants();
                setRestaurants(data);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Failed to fetch restaurants');
            }
        };

        fetchRestaurants();
    }, []);

    return { restaurants, isLoading, error };
};
