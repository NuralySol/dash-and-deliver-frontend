import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { fetchDataController } from '../controllers/homeController.js'; 
import './HomeComponent.css';  

const HomeComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            await fetchDataController(setData, setError);
        };
        fetchHomeData();
    }, []);

    return (
        <div className="container-home">
            <h1 className="title-home">DashAndDeliver</h1>
            {error && <p className="error-home">Error: {error}</p>}
            {data ? (
                <div>
                    <h2 className="message-home">{data.message}</h2>
                </div>
            ) : (
                <p className="loading-home">Loading...</p>
            )}
         
            <p className="register-link">
                Don't have an account? <Link to="/register">Register Here</Link>
            </p>
            <p className="login-link">
                Have an account already <Link to="/login">Login Here</Link>
            </p>
        </div>
    );
};

export default HomeComponent;