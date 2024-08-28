import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../services/loginFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBasket,
  faShoppingBag,
  faStore,
  faWineBottle,
  faTags,
  faPaw,
  faHeart,
  faSearch,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import CardComponent from "./CardComponent.jsx";
import "./DashboardComponent.css";

const DashboardComponent = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

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

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <a href="#home">
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" /> Home
            </a>
          </li>
          <li>
            <a href="#grocery">
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className="sidebar-icon"
              />{" "}
              Grocery
            </a>
          </li>
          <li>
            <a href="#retail">
              <FontAwesomeIcon icon={faShoppingBag} className="sidebar-icon" />{" "}
              Retail
            </a>
          </li>
          <li>
            <a href="#convenience">
              <FontAwesomeIcon icon={faStore} className="sidebar-icon" />{" "}
              Convenience
            </a>
          </li>
          <li>
            <a href="#alcohol">
              <FontAwesomeIcon icon={faWineBottle} className="sidebar-icon" />{" "}
              Alcohol
            </a>
          </li>
          <li>
            <a href="#offers">
              <FontAwesomeIcon icon={faTags} className="sidebar-icon" /> Offers
            </a>
          </li>
          <li>
            <a href="#pets">
              <FontAwesomeIcon icon={faPaw} className="sidebar-icon" /> Pets
            </a>
          </li>
          <li>
            <a href="#beauty">
              <FontAwesomeIcon icon={faHeart} className="sidebar-icon" /> Beauty
            </a>
          </li>
          <li>
            <a href="#browse">
              <FontAwesomeIcon icon={faSearch} className="sidebar-icon" />{" "}
              Browse All
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <ul>
            <a href="#logout">Logout</a>
            <a href="#help">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="sidebar-icon"
              />{" "}
              Help & Support
            </a>
          </ul>
        </div>
      </aside>
      <div className="dashboard-container">
      <h2 className="dashboard-welcome">Welcome, {username}!</h2>
      {error && <p className="dashboard-error">{error}</p>}
      <CardComponent restaurants={restaurants} />
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
