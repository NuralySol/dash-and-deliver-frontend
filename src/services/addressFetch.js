import { jwtDecode } from "jwt-decode";

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
            throw new Error('Failed to fetch addresses');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to fetch addresses');
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
            throw new Error('Failed to fetch address by ID');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to fetch address by ID');
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
            throw new Error('Failed to create address');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to create address');
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
            throw new Error('Failed to update address');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to update address');
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
            throw new Error('Failed to delete address');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to delete address');
    }
};


