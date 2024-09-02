const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const createHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Not authorized, no token found');
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const getMenuItems = async () => {
    try {
        const response = await fetch(`${BASE_URL}/menu-items`, {
            method: 'GET',
            headers: createHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching menu items:', error.message);
        throw error;
    }
};

export const createMenuItem = async (menuItemData) => {
    try {
        const response = await fetch(`${BASE_URL}/menu-items`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(menuItemData),
        });

        if (!response.ok) {
            throw new Error('Failed to create menu item');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating menu item:', error.message);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'GET',
            headers: createHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating order:', error.message);
        throw error;
    }
};