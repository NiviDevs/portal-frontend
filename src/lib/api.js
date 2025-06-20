import axios from "axios";


export const BASE_URL = "http://localhost:5000/api";

export const loginUser = async (data) => {
    return axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
    });
};

export const registerUser = async (data) => {
    return axios.post(`${BASE_URL}/auth/register`, data, {
        withCredentials: true,
    });
};