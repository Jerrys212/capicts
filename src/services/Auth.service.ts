import axios from "axios";
import api from "../lib/axios";
import { User, UserLoginForm, UserRegisterForm, userSchema } from "../interfaces";

export const register = async (formData: UserRegisterForm) => {
    try {
        const { data } = await api.post(`/auth/register`, formData);

        return data.message;
    } catch (error) {
        let errorMessage = "Error al iniciar sesión";

        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || errorMessage;
        }
    }
};

export const login = async (formData: UserLoginForm) => {
    try {
        const { data } = await api.post<{ data: User }>(`/auth/login`, formData);

        const result = userSchema.safeParse(data.data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        let errorMessage = "Error al iniciar sesión";

        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || errorMessage;
        }
    }
};
