import * as apiFetch from '../services/addressFetch.js';

export const fetchAllAddressesController = async (setData) => {
    try {
        const data = await apiFetch.getAllAddresses();
        setData(data);
    } catch (error) {}
};

export const fetchAddressByIdController = async (id, setData) => {
    try {
        const data = await apiFetch.getAddressById(id);
        setData(data);
    } catch (error) {}
};

export const createAddressController = async (address, setData) => {
    try {
        const data = await apiFetch.createAddress(address);
        setData(data);
    } catch (error) {}
};

export const updateAddressController = async (id, address, setData) => {
    try {
        const data = await apiFetch.updateAddress(id, address);
        setData(data);
    } catch (error) {}
};

export const deleteAddressController = async (id, setData) => {
    try {
        await apiFetch.deleteAddress(id);
        setData(null);
    } catch (error) {}
};
