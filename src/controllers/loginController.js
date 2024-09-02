import { useState, useEffect } from 'react';
import { loginUser } from '../services/loginFetch.js';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const credentials = { username, password };
            const loggedInUser = await loginUser(credentials);
            if (loggedInUser) {
                localStorage.setItem('authToken', loggedInUser.token);
                setIsLoggedIn(true);
                navigate('/dashboard'); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/'); 
    };

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
            <div className="login-container">
                <h2>Login</h2>
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
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                {!isLoggedIn && <li><a href="/register">Register</a></li>}
                {!isLoggedIn ? (
                    <li><a href="/login">Login</a></li>
                ) : (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )}
            </ul>
        </nav>
    );
};

export default LoginComponent;

