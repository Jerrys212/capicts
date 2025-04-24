import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Contribution, ContributionFormData } from "../interfaces";

export const getContributions = async () => {
    try {
        const { data } = await api.get(`/contributions`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const getContribution = async (_id: Contribution["_id"]) => {
    try {
        const { data } = await api.get(`/contributions/${_id}`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const createContribution = async (formData: ContributionFormData) => {
    try {
        const { data } = await api.post(`/contributions`, formData);

        console.log(data);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const deleteGroup = async (_id: Contribution["_id"]) => {
    try {
        const { data } = await api.delete(`/contributions/${_id}`);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};
