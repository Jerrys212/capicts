import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Loan, LoanFormData } from "../interfaces";

export const getLoans = async () => {
    try {
        const { data } = await api.get(`/loans`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const getLoan = async (_id: Loan["_id"]) => {
    try {
        const { data } = await api.get(`/loans/${_id}`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const createLoan = async (formData: LoanFormData) => {
    try {
        const { data } = await api.post(`/loans`, formData);

        console.log(data);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const updateLoan = async (_id: Loan["_id"], formData: LoanFormData) => {
    try {
        const { data } = await api.put(`/loans/${_id}`, formData);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const deleteLoan = async (_id: Loan["_id"]) => {
    try {
        const { data } = await api.delete(`/loans/${_id}`);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};
