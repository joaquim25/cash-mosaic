import { User } from "../types";
import { fetchProfileData } from "@/pages/api/profile";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_PROFILE_INFO = "GET_PROFILE_INFO";

export const actions = {
    LOGIN,
    LOGOUT,
    GET_PROFILE_INFO,
};

export const logIn = (authToken: string) => ({ type: LOGIN, payload: authToken });
export const logOut = () => ({ type: LOGOUT });
export const setProfileInfo = () => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetchProfileData(token);
            const user = response.data;
            dispatch(setUser(user));
        } catch (error) {
            console.error(error);
        }
    };
};

export const setUser = (user: User) => ({ type: GET_PROFILE_INFO, payload: user });