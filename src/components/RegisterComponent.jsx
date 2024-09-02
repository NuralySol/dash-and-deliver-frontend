import { useState } from 'react';
import { RegisterController } from '../controllers/registerController.js';
import { useNavigate } from 'react-router-dom'; 
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
            navigate('/login'); 
        }
    };

    return (
        <div>
            <NavBar /> 
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