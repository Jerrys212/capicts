import { StateCreator } from "zustand";
import { Contribution, Group, GroupFormData, User } from "../interfaces";
import { createGroup, deleteGroup, getGroup, getGroupMembers, getGroups, IGroupAPI, updateGroup } from "../services/Groups.Service";

export interface GroupsStore {
    groups: Group[];
    group: Group;
    members: User[];
    getGroups: () => Promise<void>;
    getGroup: (_id: Group["_id"]) => Promise<void>;
    getMembers: (_id: User["_id"]) => Promise<boolean>;
    createGroup: (formData: GroupFormData) => Promise<string>;
    updateGroup: ({ formData, groupId }: IGroupAPI) => Promise<string>;
    resetForm: () => void;
    deleteGroups: (_id: Group["_id"]) => Promise<string>;
}

export const createGroupStore: StateCreator<GroupsStore> = (set) => ({
    groups: [],
    group: {} as Group,
    members: [],
    getGroups: async () => {
        const groups = await getGroups();
        if (groups) {
            set({ groups });
        } else {
            set({ groups: [] });
        }
    },
    getGroup: async (_id: Group["_id"]) => {
        const group = await getGroup(_id);
        if (group) {
            set({ group });
        } else {
            set({ group: {} as Group });
        }
    },
    createGroup: async (formData: GroupFormData) => {
        const group = await createGroup(formData);

        if (group) {
            return group;
        }
    },

    updateGroup: async ({ formData, groupId }: IGroupAPI) => {
        const group = await updateGroup({ formData, groupId });

        if (group) {
            return group;
        }
    },
    getMembers: async (_id: User["_id"]) => {
        try {
            const members = await getGroupMembers(_id);
            if (members.length > 0) {
                set({ members });
                return true;
            } else {
                set({ members: [] });
                return false;
            }
        } catch (error) {
            console.error("Error al obtener miembros:", error);
            set({ members: [] });
            return false;
        }
    },
    resetForm: () => {
        set({ members: [] });
    },
    deleteGroups: async (_id: Contribution["_id"]) => {
        const response = await deleteGroup(_id);
        if (response) {
            return response;
        }
    },
});
