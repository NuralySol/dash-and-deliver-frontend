
import "./CardComponent.css";

const CardComponent = ({ restaurants = [], onRestaurantClick }) => {
  return (
    <>
      <h2>Featured Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div 
          key={restaurant._id} className="restaurant-card"
          onClick={() => onRestaurantClick(restaurant._id)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardComponent;