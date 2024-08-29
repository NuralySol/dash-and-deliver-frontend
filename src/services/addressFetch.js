const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

// Function to fetch all addresses
export const getAllAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Not authorized, no token');
    }

    try {
        const response = await fetch(`${BASE_URL}/addresses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch addresses: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all addresses:', error);
        throw error;
    }
};

// Function to fetch an address by ID
export const getAddressById = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Not authorized, no token');
    }

    try {
        const response = await fetch(`${BASE_URL}/addresses/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch address by ID: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching address by ID (${id}):`, error);
        throw error;
    }
};

// Function to create a new address
export const createAddress = async (address) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Not authorized, no token');
    }

    try {
        const response = await fetch(`${BASE_URL}/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
        });
        if (!response.ok) {
            throw new Error(`Failed to create address: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};

// Function to update an existing address
export const updateAddress = async (id, address) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Not authorized, no token');
    }

    try {
        const response = await fetch(`${BASE_URL}/addresses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
        });
        if (!response.ok) {
            throw new Error(`Failed to update address: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating address (${id}):`, error);
        throw error;
    }
};

// Function to delete an address
export const deleteAddress = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Not authorized, no token');
    }

    try {
        const response = await fetch(`${BASE_URL}/addresses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete address: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting address (${id}):`, error);
        throw error;
    }
};