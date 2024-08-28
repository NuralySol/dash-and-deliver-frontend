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
                <div className="navbar-search-container">
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <div className="location-dropdown">
                        <button
                            aria-haspopup="true"
                            onClick={toggleDropdown}
                            className="location-button"
                        >
                            <span className="location-text">{location || 'Select or enter address...'}</span>
                            <span className="dropdown-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 11l4-4H4l4 4z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">
                                    <input
                                        type="text"
                                        placeholder="Enter new address..."
                                        value={inputAddress}
                                        onChange={handleInputChange}
                                        className="address-input"
                                    />
                                    <button onClick={handleAddAddress} className="add-address-button">
                                        Add
                                    </button>
                                </div>
                                {savedAddresses.map((addr, index) => (
                                    <div
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleLocationChange(addr)}
                                    >
                                        {addr}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <nav className="category-navbar">
                <ul className="category-menu">
                    <li onClick={() => handleCategoryChange('Fast Food')} className={selectedCategory === 'Fast Food' ? 'active' : ''}>
                        <img src="fast-food.png" alt="Fast Food" />
                        <span>Fast Food</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Indian')} className={selectedCategory === 'Indian' ? 'active' : ''}>
                        <img src="papri-chaat.png" alt="Indian" />
                        <span>Indian</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Chinese')} className={selectedCategory === 'Chinese' ? 'active' : ''}>
                        <img src="buns.png" alt="Chinese" />
                        <span>Chinese</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Italian')} className={selectedCategory === 'Italian' ? 'active' : ''}>
                        <img src="spaghetti.png" alt="Italian" />
                        <span>Italian</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Mexican')} className={selectedCategory === 'Mexican' ? 'active' : ''}>
                        <img src="mexican-food.png" alt="Mexican" />
                        <span>Mexican</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Breakfast')} className={selectedCategory === 'Breakfast' ? 'active' : ''}>
                        <img src="breakfast.png" alt="Breakfast" />
                        <span>Breakfast</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Vegan')} className={selectedCategory === 'Vegan' ? 'active' : ''}>
                        <img src="vegetarian.png" alt="Vegan" />
                        <span>Vegan</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Thai')} className={selectedCategory === 'Thai' ? 'active' : ''}>
                        <img src="mango.png" alt="Thai" />
                        <span>Thai</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Halal')} className={selectedCategory === 'Halal' ? 'active' : ''}>
                        <img src="halal.png" alt="Halal" />
                        <span>Halal</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Kosher')} className={selectedCategory === 'Kosher' ? 'active' : ''}>
                        <img src="kosher.png" alt="Kosher" />
                        <span>Kosher</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Salad')} className={selectedCategory === 'Salad' ? 'active' : ''}>
                        <img src="salad.png" alt="Salad" />
                        <span>Salad</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Seafood')} className={selectedCategory === 'Seafood' ? 'active' : ''}>
                        <img src="seafood.png" alt="Seafood" />
                        <span>Seafood</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Coffee')} className={selectedCategory === 'Coffee' ? 'active' : ''}>
                        <img src="coffee-cup.png" alt="Coffee" />
                        <span>Coffee</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Sushi')} className={selectedCategory === 'Sushi' ? 'active' : ''}>
                        <img src="sushi.png" alt="Sushi" />
                        <span>Sushi</span>
                    </li>
                    <li onClick={() => handleCategoryChange('Sandwiches')} className={selectedCategory === 'Sandwiches' ? 'active' : ''}>
                        <img src="sandwich.png" alt="Sandwiches" />
                        <span>Sandwiches</span>
                    </li>
                </ul>
            </nav>

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
