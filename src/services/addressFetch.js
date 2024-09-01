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
            const error = await response.json();
            throw new Error(`Failed to fetch addresses: ${error.message}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to fetch addresses: ${error.message}`);
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
            const error = await response.json();
            throw new Error(`Failed to fetch address by ID: ${error.message}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to fetch address by ID: ${error.message}`);
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
            const error = await response.json();
            throw new Error(`Failed to create address: ${error.message}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to create address: ${error.message}`);
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
            const error = await response.json();
            throw new Error(`Failed to update address: ${error.message}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to update address: ${error.message}`);
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
            const error = await response.json();
            throw new Error(`Failed to delete address: ${error.message}`);
        }
        return { message: 'Address deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete address: ${error.message}`);
    }
};