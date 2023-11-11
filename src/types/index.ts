// REDUX global
export interface RootState {
    user: User;
}

export interface Action {
    type: string;
    payload?: any;
}

// userReducer
export interface User {
    id: number | null;
    name: string;
    isLoggedIn: boolean;
}