import { StateCreator } from "zustand";
import { ConfirmToken, User, UserLoginForm, UserRegisterForm } from "../interfaces";
import { login, register } from "../services/Auth.service";

export interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    token: string;
    register: (formData: UserRegisterForm) => Promise<boolean>;
    confirmToken: (token: ConfirmToken["token"]) => Promise<void>;
    login: (formData: UserLoginForm) => Promise<boolean>;
    logout: () => void;
}

export const createAuthStore: StateCreator<AuthStore> = (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: "",
    register: async (formData: UserRegisterForm) => {
        const user = await register(formData);
        return user;
    },
    login: async (formData: UserLoginForm) => {
        try {
            set({ isLoading: true, error: null });
            const user = await login(formData);
            if (user) {
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null,
                    token: user.token,
                });
                return true;
            }
            set({
                isLoading: false,
                error: "Credenciales inválidas",
            });
            return false;
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Error al iniciar sesión",
            });
            return false;
        }
    },

    confirmToken: async (token: ConfirmToken["token"]) => {
        console.log(token);
    },
    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            isAuthenticated: false,
            error: null,
        });
    },
});
