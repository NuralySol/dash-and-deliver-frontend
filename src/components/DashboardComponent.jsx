import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../services/loginFetch";
import { getMenuItems } from "../services/menuAndOrderFetch.js";
import { getAllAddresses, createAddress, updateAddress, deleteAddress } from "../services/addressFetch.js";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestionCircle,
  faPeopleGroup,
  faCartPlus,
  faBars,
  faTimes,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import CardComponent from "./CardComponent.jsx";
import MenuComponent from "./MenuComponent.jsx";
import Modal from "./ModalComponent.jsx";
import DeliveryModal from "./DeliveryComponent.jsx";
import "./DashboardComponent.css";

const DashboardComponent = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [displayedAddress, setDisplayedAddress] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || "User");
      } catch (err) {
        console.error("Token decoding error:", err.message);
        setError("Failed to decode token.");
        return;
      }
    } else {
      setError("No token found. Please log in.");
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchData("/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err.message);
        setError(err.message);
      }
    };

    const loadRestaurants = async () => {
      try {
        const data = await fetchData("/restaurants");
        setRestaurants(data);
      } catch (err) {
        console.error("Error loading restaurants:", err.message);
        setError(err.message);
      }
    };

    const loadAddresses = async () => {
      try {
        const addresses = await getAllAddresses();
        if (addresses.length > 0) {
          setDisplayedAddress(addresses[0]);
        }
      } catch (err) {
        console.error("Error loading addresses:", err.message);
        setError(err.message);
      }
    };

    loadOrders();
    loadRestaurants();
    loadAddresses();

    if (location.state?.paymentSuccess) {
      const randomDeliveryTime = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
      setDeliveryTime(randomDeliveryTime);
      setIsDeliveryModalOpen(true);
      navigate('/dashboard', { replace: true, state: {} });
    }
  }, [location.state?.paymentSuccess, navigate]);

  const filterMenuItemsByRestaurant = (restaurantId, menuItems) => {
    return menuItems.filter((item) => item.restaurant === restaurantId);
  };

  const handleRestaurantClick = async (restaurantId) => {
    try {
      const data = await getMenuItems(restaurantId);
      const filteredItems = filterMenuItemsByRestaurant(restaurantId, data);
      setMenuItems(filteredItems);
      setIsMenuOpen(true);
    } catch (err) {
      console.error("Error loading menu items:", err.message);
      setError(err.message);
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setIsCartOpen(true);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const groupItemsByRestaurant = () => {
    return cartItems.reduce((acc, item) => {
      const restaurantId = item.restaurant;
      if (!acc[restaurantId]) {
        acc[restaurantId] = [];
      }
      acc[restaurantId].push(item);
      return acc;
    }, {});
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
    if (cartItems.length === 0) {
      setModalMessage('Please select items before proceeding to payment.');
      setIsModalOpen(true);
      return;
    }
    if (!displayedAddress) {
      setModalMessage('Please enter your address before proceeding to payment.');
      setIsModalOpen(true);
      return;
    }
    navigate('/checkout', { state: { cartItems } });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeliveryModalClose = () => {
    setIsDeliveryModalOpen(false);
  };

  const handleAboutUsModalClose = () => {
    setIsAboutUsModalOpen(false);
  };

  const handleHelpModalClose = () => {
    setIsHelpModalOpen(false);
  };

  const groupedItems = groupItemsByRestaurant();

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <button
          onClick={slideSidebar}
          className="sidebar-button"
          style={{ display: isSidebarActive ? "none" : "block" }}
        >
          <FontAwesomeIcon
            icon={isSidebarActive ? faTimes : faBars}
            className="menu-icon"
          />
        </button>
        <div className="navbar-logo">
          <img src="../src/assets/logo.png" alt="DashAndDeliver Logo" />
        </div>
        <div
          onClick={() => setIsCartOpen(true)}
          className="cart-icon-container"
        >
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </div>
      </nav>
      <aside className={`sidebar ${isSidebarActive ? "active" : ""}`}>
        <button onClick={slideSidebar} className="hide-sidebar-button">
          <FontAwesomeIcon icon={faTimes} className="menu-icon" />
        </button>
        <ul className="sidebar-nav">
          <li>
            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" /> Home
            </button>
          </li>
          <li>
            <button onClick={() => setIsAboutUsModalOpen(true)}>
              <FontAwesomeIcon icon={faPeopleGroup} className="sidebar-icon" /> About Us
            </button>
          </li>
        </ul>
        <div className="sidebar-footer">
          <ul>
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={() => setIsHelpModalOpen(true)} className="help-support-button">
              <div>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="sidebar-icon"
                />
              </div>
              Help & Support
            </button>
          </ul>
        </div>
      </aside>
      <div className={`dashboard-container ${isSidebarActive ? "shifted" : ""}`}>
        <h2 className="dashboard-welcome">
          Welcome, {username}!
        </h2>
        {error && <p className="dashboard-error">{error}</p>}
        <CardComponent
          restaurants={restaurants}
          onRestaurantClick={handleRestaurantClick}
        />
        <MenuComponent isOpen={isMenuOpen} onClose={handleCloseMenu}>
          <h3>Menu</h3>
          {menuItems.length > 0 ? (
            <ul>
              {menuItems.map((item) => (
                <li key={item._id}>
                  {item.item_name} - ${item.price}
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="add-to-cart-icon"
                    onClick={() => handleAddToCart(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items available.</p>
          )}
        </MenuComponent>
        {isCartOpen && (
          <div className="cart-popup">
            <button className="close-cart-button" onClick={handleCloseCart}>
              X
            </button>
            <h3>Your Cart</h3>
            {Object.keys(groupedItems).map((restaurantId) => (
              <div key={restaurantId} className="restaurant-cart">
                <h4>{restaurants.find(r => r._id === restaurantId)?.name}</h4>
                <ul className="cart-items-list">
                  {groupedItems[restaurantId].map((item, index) => (
                    <li key={index}>
                      {item.item_name} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={handleClearCart}
              className="clear-cart-button"
              style={{
                display: 'block',
                width: '80%',
                padding: '8px',
                backgroundColor: '#ff8800',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                textAlign: 'center',
                margin: '10px auto',
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckoutClick}
              className="checkout-button"
              style={{
                display: 'block',
                width: '100%',
                padding: '15px',
                backgroundColor: 'rgb(8, 183, 151)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                textAlign: 'center',
              }}
            >
              Proceed to Payment
            </button>
          </div>
        )}
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              {order.description}
            </li>
          ))}
        </ul>
        <div className="address-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                transition: 'border-color 0.3s ease',
              }}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city (optional)"
              style={{
                flex: 0.4,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#f9f9f9',
                transition: 'border-color 0.3s ease',
              }}
            />
          </div>
          <button className="submit-address-button" onClick={handleAddressSubmit}>
            {isUpdating ? 'Update Address' : 'Submit Address'}
          </button>
        </div>
        {displayedAddress && (
          <div className="address-display">
            <h3>Your Address:</h3>
            <p>{displayedAddress.address_line}</p>
            {displayedAddress.city && <p>City: {displayedAddress.city}</p>}
            <button className="edit-address-button" onClick={handleAddressEdit}>Edit Address</button>
            <button className="delete-address-button" onClick={handleAddressDelete}>Delete Address</button>
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={handleModalClose}
        />
        <DeliveryModal
          isOpen={isDeliveryModalOpen}
          message={`Thank you for ordering! Your delivery will arrive in approximately ${deliveryTime} minutes at ${displayedAddress?.address_line}, ${displayedAddress?.city}.`}
          onClose={handleDeliveryModalClose}
        />
        <Modal
          isOpen={isAboutUsModalOpen}
          message="This project was created by Nuraly, Wendy, Junnat and Robert at GA."
          onClose={handleAboutUsModalClose}
        />
        <Modal
          isOpen={isHelpModalOpen}
          message={(
            <ul>
              <li>Please use your mouse to navigate and choose a restaurant.</li>
              <li>Enter your address.</li>
              <li>Add chosen items to the cart.</li>
              <li>Proceed to payment for delivery.</li>
            </ul>
          )}
          onClose={handleHelpModalClose}
        />
      </div>
    </div>
  );
};

export default DashboardComponent;