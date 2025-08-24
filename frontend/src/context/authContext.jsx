import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get(API_ENDPOINTS.PROFILE, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(data); 
                } catch (err) {
                    console.error('Failed to fetch user profile:', err);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
            localStorage.setItem('token', data.token); 
            setUser(data.user); 
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post(API_ENDPOINTS.REGISTER, userData);
            localStorage.setItem('token', data.token); 
            setUser(data.user); 
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token'); 
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
