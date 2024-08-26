
import * as apiFetch from '../services/addressFetch.js';

export const fetchAllAddressesController = async (setData, setError) => {
    try {
        const data = await apiFetch.getAllAddresses();
        setData(data);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        setError(error.message);
    }
};

export const fetchAddressByIdController = async (id, setData, setError) => {
    try {
        const data = await apiFetch.getAddressById(id);
        setData(data);
    } catch (error) {
        console.error('Error fetching address by ID:', error);
        setError(error.message);
    }
};

export const createAddressController = async (address, setData, setError) => {
    try {
        const data = await apiFetch.createAddress(address);
        setData(data);
    } catch (error) {
        console.error('Error creating address:', error);
        setError(error.message);
    }
};

export const updateAddressController = async (id, address, setData, setError) => {
    try {
        const data = await apiFetch.updateAddress(id, address);
        setData(data);
    } catch (error) {
        console.error('Error updating address:', error);
        setError(error.message);
    }
};

export const deleteAddressController = async (id, setData, setError) => {
    try {
        await apiFetch.deleteAddress(id);
        setData(null);
    } catch (error) {
        console.error('Error deleting address:', error);
        setError(error.message);
    }
};
