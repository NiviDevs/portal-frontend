import axios from "axios";

var onlineMode = false;
//for testing use localhost else use the one hosted on render

export const BASE_URL = onlineMode
    ? "https://portal-backend-gkgu.onrender.com/api"
    : "http://localhost:5000/api";

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