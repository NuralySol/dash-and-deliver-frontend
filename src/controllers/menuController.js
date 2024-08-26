import { getMenuItems, createMenuItem } from '../services/menuAndOrderFetch.js';

export const FetchMenuItems = async (setMenuItems, setError) => {
    try {
        const data = await getMenuItems();
        setMenuItems(data);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        setError(error.message);
    }
};

export const addMenuItem = async (menuItemData, setMenuItems, setError) => {
    try {
        const newItem = await createMenuItem(menuItemData);
        setMenuItems(prevItems => [...prevItems, newItem]);
    } catch (error) {
        console.error('Error creating menu item:', error);
        setError(error.message);
    }
};