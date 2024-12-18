import axios from 'axios';
import { BACKEND_API_URL } from '../config';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/login`, {
        email,
        password,
    });

    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/register`, {
        name,
        email,
        password,
    });

    return response.data;
};

export const verifyEmail = async (email: string, token: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/verify-email`, {
        email,
        token,
    });

    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/forgot-password`, {
        email,
    });

    return response.data;
};

export const resetPassword = async (email: string, token: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/reset-password`, {
        email,
        token,
        password,
    });

    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${BACKEND_API_URL}/logout`);

    return response.data;
};
