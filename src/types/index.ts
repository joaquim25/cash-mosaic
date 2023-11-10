// Login & Sign-up
export type Fields = {
    name: "email" | "password" | "firstname" | "lastname",
    label: string,
    type: string
}[];

// AuthForm
export type FormValues = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

// REDUX General
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
    firstname: string;
    lastname: string;
    location: string;
    bio: string;
    isLoggedIn: boolean;
}