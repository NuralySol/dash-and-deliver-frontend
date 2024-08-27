import { useEffect, useState } from 'react';
import {jwtDecode }from 'jwt-decode'; // Make sure this is installed and correctly imported
import { fetchData } from '../services/loginFetch';
import './DashboardComponent.css';

const DashboardComponent = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Decode the token and set the username
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.username || 'User');
                console.log('Token:', token); // Debugging log
                console.log('Decoded Token:', decodedToken); // Debugging log
            } catch (err) {
                console.error('Token decoding error:', err.message);
                setError('Failed to decode token.');
                return; // Exit if token decoding fails
            }
        } else {
            setError('No token found. Please log in.');
            return; // Exit if no token is found
        }

        const loadOrders = async () => {
            try {
                const data = await fetchData('/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach token in header
                    },
                });
                setOrders(data);
            } catch (err) {
                console.error('Error loading orders:', err.message);
                setError(err.message);
            }
        };

        loadOrders(); // Fetch orders
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-welcome">Welcome, {username}!</h2>
            {error && <p className="dashboard-error">{error}</p>}
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">{order.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardComponent;