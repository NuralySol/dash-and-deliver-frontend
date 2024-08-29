import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Corrected import statement
import { fetchData } from '../services/loginFetch';
import { getMenuItems } from '../services/menuAndOrderFetch.js';
import { getAllAddresses, createAddress, updateAddress, deleteAddress } from '../services/addressFetch.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import CardComponent from './CardComponent.jsx';
import CheckoutComponent from '../components/CheckoutComponent.jsx';
import MenuComponent from '../components/MenuComponent.jsx';  // <-- Import MenuComponent
import './DashboardComponent.css';

const DashboardComponent = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // <-- State for MenuComponent
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [displayedAddress, setDisplayedAddress] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || 'User');
      } catch (err) {
        console.error('Token decoding error:', err.message);
        setError('Failed to decode token.');
        return;
      }
    } else {
      setError('No token found. Please log in.');
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchData('/orders', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error('Error loading orders:', err.message);
        setError(err.message);
      }
    };

    const loadRestaurants = async () => {
      try {
        const data = await fetchData('/restaurants');
        setRestaurants(data);
      } catch (err) {
        console.error('Error loading restaurants:', err.message);
        setError(err.message);
      }
    };

    const loadAddresses = async () => {
      try {
        const addresses = await getAllAddresses();
        if (addresses.length > 0) {
          setDisplayedAddress(addresses[0]); // Assuming you're displaying the first address
        }
      } catch (err) {
        console.error('Error loading addresses:', err.message);
        setError(err.message);
      }
    };

    loadOrders();
    loadRestaurants();
    loadAddresses();
  }, []);

  const handleRestaurantClick = async (restaurantId) => {
    try {
      const data = await getMenuItems(restaurantId);
      setMenuItems(data);
      setIsMenuOpen(true);  // <-- Open the MenuComponent when a restaurant is clicked
    } catch (err) {
      console.error('Error loading menu items:', err.message);
      setError(err.message);
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);  // <-- Close the MenuComponent
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const slideSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleAddressSubmit = async () => {
    try {
      let data;
      if (isUpdating && displayedAddress) {
        data = await updateAddress(displayedAddress._id, { address_line: address, city });
      } else {
        data = await createAddress({ address_line: address, city });
      }
      setDisplayedAddress(data);
      setAddress('');
      setCity('');
      setIsUpdating(false);
    } catch (error) {
      console.error('Address operation error:', error.message);
      setError(error.message);
    }
  };

  const handleAddressDelete = async () => {
    try {
      if (displayedAddress && displayedAddress._id) {
        await deleteAddress(displayedAddress._id);
        setDisplayedAddress(null);
        setAddress('');
        setCity('');
      }
    } catch (error) {
      console.error('Error deleting address:', error.message);
      setError(error.message);
    }
  };

  const handleAddressEdit = () => {
    setAddress(displayedAddress.address_line);
    setCity(displayedAddress.city);
    setIsUpdating(true);
  };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <div className="dashboard-wrapper">
      <button onClick={slideSidebar} className="sidebar-button">
        {isSidebarActive ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <aside className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <ul className="sidebar-nav">
          <li>
            <a href="#home">
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" /> Home
            </a>
          </li>
          <li>
            <a href="#about">
              <FontAwesomeIcon icon={faPeopleGroup} className="sidebar-icon" /> About Us
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <ul>
            <button onClick={handleLogout}>Log Out</button>
            <a href="#help">
              <FontAwesomeIcon icon={faQuestionCircle} className="sidebar-icon" /> Help & Support
            </a>
          </ul>
        </div>
      </aside>
      <div className={`dashboard-container ${isSidebarActive ? 'shifted' : ''}`}>
        <h2 className="dashboard-welcome">
          Welcome, {username}!
          {displayedAddress && (
            <span> | Address: {displayedAddress.address_line}, {displayedAddress.city}</span>
          )}
        </h2>
        {error && <p className="dashboard-error">{error}</p>}
        <CardComponent
          restaurants={restaurants}
          onRestaurantClick={handleRestaurantClick}
        />
        <MenuComponent isOpen={isMenuOpen} onClose={handleMenuClose}>
          <h3>Menu</h3>
          <ul>
            {menuItems.map(item => (
              <li key={item._id}>  {/* Ensure each list item has a unique key */}
                {item.item_name} - ${item.price}
              </li>
            ))}
          </ul>
        </MenuComponent>
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">  {/* Ensure each list item has a unique key */}
              {order.description}
            </li>
          ))}
        </ul>
        <div className="address-section">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city (optional)"
          />
          <button onClick={handleAddressSubmit}>
            {isUpdating ? 'Update Address' : 'Submit Address'}
          </button>
        </div>
        {displayedAddress && (
          <div className="address-display">
            <h3>Your Address:</h3>
            <p>{displayedAddress.address_line}</p>
            {displayedAddress.city && <p>City: {displayedAddress.city}</p>}
            <button onClick={handleAddressEdit}>Edit Address</button>
            <button onClick={handleAddressDelete}>Delete Address</button>
          </div>
        )}
        <button onClick={handleCheckoutClick}>
          Proceed to Payment
        </button>
        {showCheckout && (
          <div>
            <h2>Payment Section</h2>
            <CheckoutComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;