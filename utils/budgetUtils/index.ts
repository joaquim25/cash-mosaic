import { User } from "@/store/types";

// Calculate total expenses when given user object
export const getTotalExpenses = (user: User) => {
    const totalExpenses = user.transactions!.reduce((total: number, transaction: { amount: string; }) => {
        const amount = parseFloat(transaction.amount.replace(',', '.'));

        // Only consider negative amounts as expenses
        if (amount < 0) {
            total += amount;
        }

        return total;
    }, 0);

    return totalExpenses;
}

// Calculate total income when given user object
export const getTotalIncome = (user: User) => {
    const totalIncome = user.transactions!.reduce((total: number, transaction: { amount: string; }) => {
        const amount = parseFloat(transaction.amount.replace(',', '.'));

        // Only consider positive amounts as income
        if (amount > 0) {
            total += amount;
        }

        return total;
    }, 0);

    return totalIncome;
}