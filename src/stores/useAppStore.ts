import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { AuthStore, createAuthStore } from "./authStore";
import { ContributionsStore, createContributionStore } from "./contributionsStore";
import { createGroupStore, GroupsStore } from "./groupStore";
import { createLoanStore, LoansStore } from "./loanStore";

export const useAppStore = create<AuthStore & ContributionsStore & GroupsStore & LoansStore>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthStore(...a),
                ...createContributionStore(...a),
                ...createGroupStore(...a),
                ...createLoanStore(...a),
            }),
            {
                name: "user-storage",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);
