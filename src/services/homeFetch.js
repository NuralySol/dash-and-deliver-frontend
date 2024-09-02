const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const getData = async () => {
    try {
        const response = await fetch(`${BASE_URL}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            const text = await response.text();
            return { message: text };
        }
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
};