import * as apiFetch from '../services/addressFetch.js';

export const fetchAllAddressesController = async (setData) => {
    try {
        const data = await apiFetch.getAllAddresses();
        setData(data);
    } catch (error) {
        console.error('Error fetching all addresses:', error);
    }
};

export const fetchAddressByIdController = async (id, setData) => {
    try {
        const data = await apiFetch.getAddressById(id);
        setData(data);
    } catch (error) {
        console.error(`Error fetching address by ID (${id}):`, error);
    }
};

export const createAddressController = async (address, setData) => {
    try {
        const data = await apiFetch.createAddress(address);
        setData(data);
    } catch (error) {
        console.error('Error creating address:', error);
    }
};

export const updateAddressController = async (id, address, setData) => {
    try {
        const data = await apiFetch.updateAddress(id, address);
        setData(data);
    } catch (error) {
        console.error(`Error updating address (${id}):`, error);
    }
};

export const deleteAddressController = async (id, setData) => {
    try {
        await apiFetch.deleteAddress(id);
        setData(null);  // This clears the current address from the state
    } catch (error) {
        console.error(`Error deleting address (${id}):`, error);
    }
};