import { StateCreator } from "zustand";
import { createLoan, getLoan, getLoans, deleteLoan } from "../services/Loans.Service.ts";
import { Loan, LoanFormData } from "../interfaces";

export interface LoansStore {
    loans: Loan[];
    loan: Loan;
    createLoan: (formData: LoanFormData) => Promise<string>;
    getLoans: () => Promise<void>;
    getLoan: (_id: Loan["_id"]) => Promise<void>;
    deleteLoan: (_id: Loan["_id"]) => Promise<void>;
}

export const createLoanStore: StateCreator<LoansStore> = (set) => ({
    loans: [],
    loan: {} as Loan,
    getLoans: async () => {
        const loans = await getLoans();
        if (loans) {
            set({ loans });
        } else {
            set({ loans: [] });
        }
    },
    getLoan: async (_id: Loan["_id"]) => {
        const loan = await getLoan(_id);
        if (loan) {
            set({ loan });
        } else {
            set({ loan: {} as Loan });
        }
    },
    createLoan: async (formData: LoanFormData) => {
        const loan = await createLoan(formData);

        if (loan) {
            return loan;
        }
    },
    deleteLoan: async (_id: Loan["_id"]) => {
        await deleteLoan(_id);
        // Opcionalmente podrías actualizar el estado después de eliminar
        // const loans = await getLoans();
        // if (loans) {
        //     set({ loans });
        // }
    },
});
