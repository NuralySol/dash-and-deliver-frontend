import { useState } from 'react';
import { RegisterController } from '../controllers/registerController.js';
import { useNavigate } from 'react-router-dom'; 
import { Helmet } from 'react-helmet'; // Import Helmet if using dynamic font links
import './RegisterComponent.css';


const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleRegister, isLoading, error } = RegisterController();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };
        const registeredUser = await handleRegister(userData);

        if (registeredUser) {
            navigate('/login'); // Redirect to login after successful registration
        }
    };

    return (
        <div className="register-page">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Bungee+Tint&display=swap" rel="stylesheet" />
            </Helmet>
            <NavBar /> {/* Navigation bar */}
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            
           <img src="../src/assets/dash-logo.png" alt="Logo" className="navbar-logo" id="logo"/>
            
        </div>
    );
};

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
};

export default RegisterComponent;

