// store global
export interface RootState {
    user: User;
}

export interface Action {
    type: string;
    payload?: any;
}

// userReducer
export interface User {
    id?: number | null;
    firstname: string;
    lastname: string;
    location: string;
    bio: string;
    authToken?: string;
    isLoggedIn: boolean;
    password?: string;
    balance?: number;
    totalIncome?: number;
    totalExpenses?: number;
    transactions_expenses?: {
        id: number;
        date: string;
        amount: string;
        category: string;
    }[];
    transactions_income?: {
        id: number;
        date: string;
        amount: string;
        category: string;
    }[];
}