import { useState } from 'react';  
import { registerUser } from '../services/registerFetch.js'; 

export const RegisterController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await registerUser(userData);
      setIsLoading(false);
      return data;
    } catch (err) {
      console.error('Registration error:', err); 
      setIsLoading(false);
      setError(err.message || 'Registration failed');
      return null; 
    }
  };

  return { handleRegister, isLoading, error };
};