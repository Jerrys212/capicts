import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Group, GroupFormData } from "../interfaces";

export interface IGroupAPI {
    formData: GroupFormData;
    groupId: Group["_id"];
}

export const getGroups = async () => {
    try {
        const { data } = await api.get(`/groups`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const getGroup = async (_id: Group["_id"]) => {
    try {
        const { data } = await api.get(`/groups/${_id}`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const createGroup = async (formData: GroupFormData) => {
    try {
        const { data } = await api.post(`/groups`, formData);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const updateGroup = async ({ formData, groupId }: IGroupAPI) => {
    try {
        const { data } = await api.put(`/groups/${groupId}`, formData);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const getGroupMembers = async (_id: Group["_id"]) => {
    try {
        const { data } = await api.get(`/groups/${_id}/members`);

        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};

export const deleteGroup = async (_id: Group["_id"]) => {
    try {
        const { data } = await api.delete(`/groups/${_id}`);

        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
    }
};
