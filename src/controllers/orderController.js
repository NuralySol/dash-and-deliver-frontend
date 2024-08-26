import { getOrders, createOrder } from '../services/menuAndOrderFetch.js';

export const fetchOrders = async (setOrders, setError) => {
    try {
        const data = await getOrders();
        setOrders(data);
    } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
    }
};

export const addOrder = async (orderData, setOrders, setError) => {
    try {
        const newOrder = await createOrder(orderData);
        setOrders(prevOrders => [...prevOrders, newOrder]);
    } catch (error) {
        console.error('Error creating order:', error);
        setError(error.message);
    }
};