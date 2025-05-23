import axios from 'axios';
import { BACKEND_API_URL } from '../config';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/login`, {
        email,
        password,
    });
    localStorage.setItem("token", response.data.payload.token)
    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/register`, {
        name,
        email,
        password,
    });
    localStorage.setItem("email", response.data.payload.email)
    localStorage.setItem("name", response.data.payload.name)
    localStorage.setItem("userId", response.data.payload.id)
    localStorage.setItem("token", response.data.payload.token)
    return response.data;
};

export const verifyEmail = async (email: string, token: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/verify-email`, {
        email,
        emailVerificationToken: token,
    });
    return response.data;
};

export const reSendToken = async (email: string) => {
    const response = await axios.get(`${BACKEND_API_URL}/auth/resend-verification-email/${email}`);

    return response.data;
}

export const forgotPassword = async (email: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/forgot-password`, {
        email,
    });
    return response.data;
};

export const resetPassword = async ({ email, token, password }: {
    email: string,
    token: string,
    password: string
}) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/reset-password`, {
        email,
        passwordResetToken: token,
        password,
    });

    return response.data;
};

export const logout = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            // Simulate an asynchronous operation with a delay
            setTimeout(() => {
                localStorage.clear();
                resolve(true);
            }, 1000);
        } catch (error) {
            reject(new Error(`Failed to logout. ${error}`));
        }
    });
};
