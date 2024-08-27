# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Backup App.jsx


import { useState, useEffect } from 'react';
import { fetchDataController } from './controllers/homeController.js';
import {fetchAllAddressesController} from './controllers/addressController.js';
import { RegisterController } from './controllers/registerController.js';
import { LoginController } from './controllers/loginController.js';
import { RestaurantsController } from './controllers/restaurantController.js';

const App = () => {
  const [data, setData] = useState(null); // For homeController data
  const [addresses, setAddresses] = useState([]); // For addressController data
  const [restaurants, setRestaurants] = useState([]); // For restaurantController data
  const [error, setError] = useState(null); // General error handling
  const [user, setUser] = useState(null); // For registered or logged-in user

  // Fetch home data on component mount
  useEffect(() => {
    const fetchHomeData = async () => {
      await fetchDataController(setData, setError);
    };
    fetchHomeData();
  }, []); // Empty dependency array means this runs once after the initial render

  // Fetch all addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      await fetchAllAddressesController(setAddresses, setError);
    };
    fetchAddresses();
  }, []);

  // Fetch all restaurants on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      await RestaurantsController(setRestaurants, setError);
    };
    fetchRestaurants();
  }, []);

  // Register a new user
  const handleRegister = async () => {
    const userData = { username: 'newuser', password: 'password123' };
    const registeredUser = await RegisterController(userData, setError);
    setUser(registeredUser);
  };

  // Login an existing user
  const handleLogin = async () => {
    const credentials = { username: 'user', password: 'pass' };
    const loggedInUser = await LoginController(credentials, setError);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  return (
    <div>
      <h1>Hello world!</h1>
      {error && <p>Error: {error}</p>}

      <div>
        <h2>Home Data</h2>
        {data && <p>{data.message}</p>}
      </div>

      <div>
        <h2>Addresses</h2>
        <ul>
          {addresses.length > 0 && addresses.map((address, index) => (
            <li key={index}>{address.message}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Restaurants</h2>
        <ul>
          {restaurants.length > 0 && restaurants.map((restaurant, index) => (
            <li key={index}>{restaurant.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>User Actions</h2>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        {user && <p>Logged in as: {user.username}</p>}
      </div>
    </div>
  );
};

export default App;