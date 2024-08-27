import { jwtDecode } from "jwt-decode"; // Import the entire module

export const decodeToken = (token) => {
    try {
        // Use the jwt_decode function directly
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            throw new Error('Token has expired');
        }

        return decodedToken;
    } catch (error) {
        console.error('Failed to decode token:', error);
        throw new Error('Invalid token');
    }
};