import { jwtDecode } from "jwt-decode"; 

export const decodeToken = (token) => {
    try {

        const decodedToken = jwtDecode(token);

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