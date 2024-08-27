import { useEffect, useState } from 'react';
import { fetchData } from '../services/loginFetch'; // Reuse the fetchData function

const DashboardComponent = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchData('/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT for auth
                    }
                });
                setOrders(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadOrders();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <p>{error}</p>}
            <ul>
                {orders.map(order => (
                    <li key={order.id}>{order.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardComponent;