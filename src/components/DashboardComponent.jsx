import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../services/loginFetch";
import { getMenuItems } from "../services/menuAndOrderFetch.js";
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
  const [isCartOpen, setIsCartOpen] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Use "token" key

    if (token) {
      try {
        // Decode the token and set the username
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || "User");
        console.log("Token:", token); // Debugging log
        console.log("Decoded Token:", decodedToken); // Debugging log
      } catch (err) {
        console.error("Token decoding error:", err.message);
        setError("Failed to decode token.");
        return; // Exit if token decoding fails
      }
    } else {
      setError("No token found. Please log in.");
      return; // Exit if no token is found
    }

    const loadOrders = async () => {
      try {
        const data = await fetchData("/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
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
        const data = await fetchData("/restaurants"); // Fetch restaurants data
        setRestaurants(data);
      } catch (err) {
        console.error("Error loading restaurants:", err.message);
        setError(err.message);
      }
    };

    loadOrders(); // Fetch orders
    loadRestaurants(); // Fetch restaurants
  }, []);

  const filterMenuItemsByRestaurant = (restaurantId, menuItems) => {
    return menuItems.filter((item) => item.restaurant === restaurantId);
  };

  const handleRestaurantClick = async (restaurantId) => {
    console.log(restaurantId);

    try {
      const data = await getMenuItems(); // Fetch all menu items
      const filteredItems = filterMenuItemsByRestaurant(restaurantId, data); // Filter items by restaurantId
      setMenuItems(filteredItems); // Set the filtered items
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
    setIsCartOpen(true); // The cart opens when an item is added
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
    // Clear the user session/token
    localStorage.removeItem("token");
    // Redirect to the landing page after logout
    navigate("/");
  };

  const slideSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
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
        <h2 className="dashboard-welcome">Welcome, {username}!</h2>
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
      </div>
    </div>
  );
};

export default DashboardComponent;