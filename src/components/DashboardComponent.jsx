import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure this is installed and correctly imported
import { fetchData } from '../services/loginFetch';
import './DashboardComponent.css';

const DashboardComponent = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);

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
        filterOrders(term, location, selectedCategory);
    };

    // Handle address input change
    const handleInputChange = (event) => {
        setInputAddress(event.target.value);
    };

    // Handle address selection from dropdown
    const handleLocationChange = (loc) => {
        setLocation(loc);
        setInputAddress('');
        setDropdownVisible(false);
        filterOrders(searchTerm, loc, selectedCategory);
    };

    // Handle adding a new address
    const handleAddAddress = () => {
        if (inputAddress.trim() && !savedAddresses.includes(inputAddress.trim())) {
            setSavedAddresses([...savedAddresses, inputAddress.trim()]);
            setLocation(inputAddress.trim());
            setInputAddress('');
            setDropdownVisible(false);
            filterOrders(searchTerm, inputAddress.trim(), selectedCategory);
        }
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterOrders(searchTerm, location, category);
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Filter orders based on search term, location, and category
    const filterOrders = (term, loc, category) => {
        const filtered = orders.filter(order =>
            (category === 'All' || order.category === category) &&
            order.description.toLowerCase().includes(term.toLowerCase()) &&
            order.location.toLowerCase().includes(loc.toLowerCase())
        );
        setFilteredOrders(filtered);
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
            <a href="/dashboard">
                <img src="../src/assets/dash-logo.png" alt="Logo" className="navbar-logo" />
            </a>
                <div className="navbar-search-container">
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />

                    <img src="../src/assets/cart.png" alt="Cart Icon" className="cart-icon" />
                    <p>Cart</p>
                </div>
            </nav>

            <nav className="category-navbar">
                <ul className="category-menu">
                    <li onClick={() => handleCategoryChange('Fast Food')} className={selectedCategory === 'Fast Food' ? 'active' : ''}>
                        <img src="../src/assets/fast-food.png" alt="Fast Food" />
                        <span>Fast Food</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Indian')} className={selectedCategory === 'Indian' ? 'active' : ''}>
                        <img src="../src/assets/papri-chaat.png" alt="Indian" />
                        <span>Indian</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Chinese')} className={selectedCategory === 'Chinese' ? 'active' : ''}>
                        <img src="../src/assets/buns.png" alt="Chinese" />
                        <span>Chinese</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Italian')} className={selectedCategory === 'Italian' ? 'active' : ''}>
                        <img src="../src/assets/spaghetti.png" alt="Italian" />
                        <span>Italian</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Mexican')} className={selectedCategory === 'Mexican' ? 'active' : ''}>
                        <img src="../src/assets/mexican-food.png" alt="Mexican" />
                        <span>Mexican</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Breakfast')} className={selectedCategory === 'Breakfast' ? 'active' : ''}>
                        <img src="../src/assets/breakfast.png" alt="Breakfast" />
                        <span>Breakfast</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Vegan')} className={selectedCategory === 'Vegan' ? 'active' : ''}>
                        <img src="../src/assets/vegetarian.png" alt="Vegan" />
                        <span>Vegan</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Thai')} className={selectedCategory === 'Thai' ? 'active' : ''}>
                        <img src="../src/assets/mango.png" alt="Thai" />
                        <span>Thai</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Halal')} className={selectedCategory === 'Halal' ? 'active' : ''}>
                        <img src="../src/assets/halal.png" alt="Halal" />
                        <span>Halal</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Kosher')} className={selectedCategory === 'Kosher' ? 'active' : ''}>
                        <img src="../src/assets/kosher.png" alt="Kosher" />
                        <span>Kosher</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Salad')} className={selectedCategory === 'Salad' ? 'active' : ''}>
                        <img src="../src/assets/salad.png" alt="Salad" />
                        <span>Salad</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Seafood')} className={selectedCategory === 'Seafood' ? 'active' : ''}>
                        <img src="../src/assets/seafood.png" alt="Seafood" />
                        <span>Seafood</span>
                    </li>
                    <li onClick={() => handleCategoryChange('All')} className={selectedCategory === 'All' ? 'active' : ''}>
                        <img src="../src/assets/all.png" alt="All" />
                        <span>All</span>
                    </li>
                </ul>
            </nav>

            <div className="order-list">
                {filteredOrders.map((order, index) => (
                    <div key={index} className="order-item">
                        <h4>{order.title}</h4>
                        <p>{order.description}</p>
                        <span>{order.location}</span>
                        <span>{order.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardComponent;
