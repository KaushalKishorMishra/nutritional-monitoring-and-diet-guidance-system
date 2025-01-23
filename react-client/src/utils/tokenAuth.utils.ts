export const isValidToken = (): boolean => {
    const userData = localStorage.getItem('user-data');
    const token = userData ? JSON.parse(userData)?.state?.token : null;

    if (!token) return false;  // No token available

    try {
        // Split the token into parts (header, payload, signature)
        const parts = token.split('.');
        if (parts.length !== 3) return false; // Invalid JWT format

        // Decode the payload part (second part of the JWT)
        const payload = parts[1];

        // Base64 decode the payload
        const decoded = JSON.parse(atob(payload)); // Decode base64 to JSON
        console.log(token, decoded)

        // Extract the expiration (exp) time and compare with current time
        const expDate = decoded.exp * 1000; // `exp` is in seconds
        const currentDate = Date.now();

        // Check if the token has expired
        if (currentDate > expDate) {
            return false; // Token has expired
        }
    } catch (error) {
        console.log(error)
        return false;
    }

    return true; // Token is still valid
};
