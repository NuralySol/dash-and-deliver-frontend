import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { fetchDataController } from '../controllers/homeController.js'; 
import logo from '@/assets/logo.png';
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
            <img src={logo} alt="DashAndDeliver Logo" />
            {error && <p className="error-home">Error: {error}</p>}
            {data ? (
                <div>
                    <h2 className="message-home">Welcome to DashAndDeliver!</h2>
                    <p className='sub-paragraph'>Your favorite meals, delivered fast and fresh, right to your door.</p>
                </div>
            ) : (
                <p className="loading-home">Loading...</p>
            )}
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <p className="login-link">
                Have an account already? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default HomeComponent;
