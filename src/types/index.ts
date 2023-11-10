//Navbar
export type NavItem = {
    href: string;
    content?: string;
    icon?: React.ReactNode;
    class?: string;
    action?: () => void;
}

//Footer
export type FooterLink = {
    href: string;
    content: string;
}

// Login & Sign-up
export type Fields = {
    name: "email" | "password" | "firstname" | "lastname",
    label: string,
    type: string,
    autocomplete?: string
}[];

// AuthForm
export type FormValues = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

// REDUX
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