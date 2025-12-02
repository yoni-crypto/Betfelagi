export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    
    GET_HOUSES: `${API_BASE_URL}/api/houses/get`,
    FILTER_HOUSES: `${API_BASE_URL}/api/houses/filter`,
    GET_HOUSE: (id) => `${API_BASE_URL}/api/houses/${id}`,
    CREATE_HOUSE: `${API_BASE_URL}/api/houses/add`,
    UPDATE_HOUSE: (id) => `${API_BASE_URL}/api/houses/edit/${id}`,
    DELETE_HOUSE: (id) => `${API_BASE_URL}/api/houses/delete/${id}`,
    
    GET_USER: (id) => `${API_BASE_URL}/api/users/${id}`,
    GET_USER_HOUSES: (id) => `${API_BASE_URL}/api/houses/user/${id}`,
};
