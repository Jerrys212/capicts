import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APIURL,
});

api.interceptors.request.use((config) => {
    const userStorage = sessionStorage.getItem("user-storage");

    if (userStorage) {
        const userData = JSON.parse(userStorage);

        const token = userData.state.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default api;
