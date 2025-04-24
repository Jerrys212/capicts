import { StateCreator } from "zustand";
import { createContribution, getContribution, getContributions } from "../services/Contributions.Service";
import { Contribution, ContributionFormData } from "../interfaces";
export interface ContributionsStore {
    contributions: Contribution[];
    contribution: Contribution;
    createContribution: (formData: ContributionFormData) => Promise<string>;
    getContributions: () => Promise<void>;
    getContribution: (_id: Contribution["_id"]) => Promise<void>;
    deleteContribution: (_id: Contribution["_id"]) => Promise<void>;
}

export const createContributionStore: StateCreator<ContributionsStore> = (set) => ({
    contributions: [],
    contribution: {} as Contribution,
    getContributions: async () => {
        const contributions = await getContributions();
        if (contributions) {
            set({ contributions });
        } else {
            set({ contributions: [] });
        }
    },
    getContribution: async (_id: Contribution["_id"]) => {
        const contribution = await getContribution(_id);
        if (contribution) {
            set({ contribution });
        } else {
            set({ contribution: {} as Contribution });
        }
    },
    createContribution: async (formData: ContributionFormData) => {
        const contribution = await createContribution(formData);

        if (contribution) {
            return contribution;
        }
    },
    deleteContribution: async (_id: Contribution["_id"]) => {
        console.log(_id);
    },
});
