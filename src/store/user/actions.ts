import { User } from "@/types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";

export const actions = {
    LOGIN,
    LOGOUT,
    SET_USER,
};

export const logIn = (authToken: string) => ({ type: LOGIN, payload: authToken });
export const logOut = () => ({ type: LOGOUT });
export const setUser = (user: User) => ({ type: SET_USER, payload: user });
