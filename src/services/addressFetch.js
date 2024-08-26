const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

// Function to fetch all addresses
export const getAllAddresses = async () => {
    const response = await fetch(`${BASE_URL}/addresses`);
    if (!response.ok) {
        throw new Error('Failed to fetch addresses');
    }
    return response.json();
};

// Function to fetch an address by ID
export const getAddressById = async (id) => {
    const response = await fetch(`${BASE_URL}/addresses/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch address by ID');
    }
    return response.json();
};

// Function to create a new address
export const createAddress = async (address) => {
    const response = await fetch(`${BASE_URL}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    });
    if (!response.ok) {
        throw new Error('Failed to create address');
    }
    return response.json();
};

// Function to update an existing address
export const updateAddress = async (id, address) => {
    const response = await fetch(`${BASE_URL}/addresses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    });
    if (!response.ok) {
        throw new Error('Failed to update address');
    }
    return response.json();
};

// Function to delete an address
export const deleteAddress = async (id) => {
    const response = await fetch(`${BASE_URL}/addresses/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete address');
    }
    return response.json();
};