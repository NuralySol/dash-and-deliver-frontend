const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const getData = async () => {
    const response = await fetch(`${BASE_URL}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    // Check the content type of the response
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it as JSON
        const data = await response.json();
        return data;
    } else {
        // Otherwise, return the text response
        const text = await response.text();
        return { message: text }; // Return text as an object to maintain consistency
    }
};