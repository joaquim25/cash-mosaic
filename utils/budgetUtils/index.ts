import { User } from "@/store/types";

// Calculate total expenses when given user object
export const getTotalExpenses = (user: User) => {
    if (user && user.transactions) {
        const totalExpenses = user.transactions.reduce((total: number, transaction: { amount: string | number; }) => {
            let amount;
            if (typeof transaction.amount === "string") {
                amount = parseFloat(transaction.amount.replace(',', '.'));
            } else {
                amount = transaction.amount;
            }

            // Only consider negative amounts as expenses
            if (amount < 0) {
                total += amount;
            }

            return total;
        }, 0);

        return totalExpenses;
    } else {
        return null;
    }

}

// Calculate total income when given user object
export const getTotalIncome = (user: User) => {
    if (user && user.transactions) {
        const totalIncome = user.transactions.reduce((total: number, transaction: { amount: string | number; }) => {
            let amount;
            if (typeof transaction.amount === "string") {
                amount = parseFloat(transaction.amount.replace(',', '.'));
            } else {
                amount = transaction.amount;
            }

            // Only consider positive amounts as income
            if (amount > 0) {
                total += amount;
            }

            return total;
        }, 0);

        return totalIncome;
    } else {
        return null;
    }

}