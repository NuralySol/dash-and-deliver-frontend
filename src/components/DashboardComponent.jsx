import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../services/loginFetch";
import { getMenuItems } from "../services/menuAndOrderFetch.js";
import { getAllAddresses, createAddress, updateAddress, deleteAddress } from "../services/addressFetch.js";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
  }, []);

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
    navigate('/checkout', { state: { cartItems } });  // Navigate to the checkout page with cartItems
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
            <a href="#home">
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" /> Home
            </a>
          </li>
          <li>
            <a href="#about">
              <FontAwesomeIcon icon={faPeopleGroup} className="sidebar-icon" />{" "}
              About Us
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <ul>
            <button onClick={handleLogout}>Log Out</button>
            <a href="#help">
              <div>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="sidebar-icon"
                />
              </div>{" "}
              Help & Support
            </a>
          </ul>
        </div>
      </aside>
      <div
        className={`dashboard-container ${isSidebarActive ? "shifted" : ""}`}
      >
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
      </div>
    </div>
  );
};

export default DashboardComponent;