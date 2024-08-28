import "./CardComponent.css";

const CardComponent = () => {
  const restaurants = [
    {
      id: 1,
      name: "Restaurant 1",
      address: "123 data st",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 2,
      name: "Restaurant 2",
      address: "456 silly st",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <>
      <h2>Featured Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
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
