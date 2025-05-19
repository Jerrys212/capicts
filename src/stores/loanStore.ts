import { StateCreator } from "zustand";
import { createLoan, getLoan, getLoans, updateLoanStatus, registerLoanPayment } from "../services/Loans.Service.ts";
import { Loan, LoanFormData } from "../interfaces";

export interface LoansStore {
    loans: Loan[];
    loan: Loan;
    createLoan: (formData: LoanFormData) => Promise<string>;
    updateLoanStatus: (_id: Loan["_id"], status: Loan["estado"]) => Promise<string>;
    getLoans: () => Promise<void>;
    getLoan: (_id: Loan["_id"]) => Promise<void>;
    registerLoanPayment: (_id: Loan["_id"], semana: number) => Promise<string>;
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
    updateLoanStatus: async (_id: Loan["_id"], status: Loan["estado"]) => {
        const loan = await updateLoanStatus(_id, status);

        if (loan) {
            return loan;
        }
    },
    registerLoanPayment: async (_id: Loan["_id"], semana: number) => {
        const loan = await registerLoanPayment(_id, semana);

        if (loan) {
            return loan;
        }
    },
});
