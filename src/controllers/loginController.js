import { useState } from 'react';
import { loginUser } from '../services/loginFetch.js';

export const LoginController = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await loginUser(credentials);
            setIsLoading(false);
            return data;
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Login failed');
            return null; // Return null or handle the error
        }
    };

    return { handleLogin, isLoading, error };
};

