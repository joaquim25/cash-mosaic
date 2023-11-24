import { User } from "@/store/types";

// Calculate total expenses when given user object
export const getTotalExpenses = (user: User) => {
    const totalExpenses = user.transactions_expenses!.reduce((total: number, expense: { amount: string; }) => {
        return total + parseFloat(expense.amount.replace(',', '.')); // (check later if needed) Convert comma to dot and parse as float
    }, 0);

    return totalExpenses;
}

// Calculate total income when given user object
export const getTotalIncome = (user: User) => {
    const totalIncome = user.transactions_income!.reduce((total: number, income: { amount: string; }) => {
        return total + parseFloat(income.amount.replace(',', '.')); // (check later if needed) Convert comma to dot and parse as float
    }, 0);

    return totalIncome;
}