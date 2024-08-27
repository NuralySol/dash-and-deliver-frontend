import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure this is installed and correctly imported
import { fetchData } from '../services/loginFetch';
import './DashboardComponent.css';

const DashboardComponent = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

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
                setFilteredOrders(data); // Initialize filtered orders
            } catch (err) {
                console.error('Error loading orders:', err.message);
                setError(err.message);
            }
        };

        loadOrders(); // Fetch orders
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter orders based on the search term
        if (term) {
            const filtered = orders.filter(order =>
                order.description.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-brand">DashAndDeliver</div>
                <ul className="navbar-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#orders">Orders</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#signout">Sign Out</a></li>
                </ul>
            </nav>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>

            <h2 className="dashboard-welcome">Welcome, {username}!</h2>
            {error && <p className="dashboard-error">{error}</p>}
            <ul className="order-list">
                {filteredOrders.map(order => (
                    <li key={order.id} className="order-item">{order.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardComponent;
