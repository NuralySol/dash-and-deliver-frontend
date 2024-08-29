import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import { fetchData } from "../services/loginFetch";
import { getMenuItems } from "../services/menuAndOrderFetch.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestionCircle,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

import CardComponent from "./CardComponent.jsx";
import "./DashboardComponent.css";
import CheckoutComponent from '../components/CheckoutComponent.jsx';

const DashboardComponent = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Use jwt_decode instead of jwtDecode
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

    loadOrders(); 
    loadRestaurants(); 
  }, []);

  const handleRestaurantClick = async (restaurantId) => {
    try {
      const data = await getMenuItems(restaurantId); 
      setMenuItems(data);
    } catch (err) {
      console.error("Error loading menu items:", err.message);
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const slideSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleCheckoutClick = () => { 
    setShowCheckout(true);
  };

  return (
    <div className="dashboard-wrapper">
      <button onClick={slideSidebar} className="sidebar-button">
        {isSidebarActive ? "Hide Sidebar" : "Show Sidebar"}
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
        <h2 className="dashboard-welcome">Welcome, {username}!</h2>
        {error && <p className="dashboard-error">{error}</p>}
        <CardComponent
          restaurants={restaurants}
          onRestaurantClick={handleRestaurantClick} 
        />
        {menuItems.length > 0 && (
          <div className="menu-items">
            <h3>Menu</h3>
            <ul>
              {menuItems.map((item) => (
                <li key={item._id}>
                  {item.item_name} - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        )}
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              {order.description}
            </li>
          ))}
        </ul>
        
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