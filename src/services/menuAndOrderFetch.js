const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

// Menu Items Services
export const getMenuItems = async () => {
    const response = await fetch(`${BASE_URL}/menu-items`);
    if (!response.ok) {
        throw new Error('Failed to fetch menu items');
    }
    return response.json();
};

export const createMenuItem = async (menuItemData) => {
    const response = await fetch(`${BASE_URL}/menu-items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItemData),
    });
    if (!response.ok) {
        throw new Error('Failed to create menu item');
    }
    return response.json();
};

// Orders Services
export const getOrders = async () => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return response.json();
};