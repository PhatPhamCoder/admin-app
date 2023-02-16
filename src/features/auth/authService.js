import axios from 'axios';
import { base_url } from "../../utils/base_url";

const getTokenfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const config = {
    headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${getTokenfromLocalStorage.token}`
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/admin-login`, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-all-orders`, config);
    return response.data;
};

const authService = {
    login,
    getOrders
};

export default authService;