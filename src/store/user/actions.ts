import { Action, RootState, User } from "../types";
import { fetchProfileData } from "@/pages/api/profile";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { removeAuthTokenFromCookies, setAuthTokenInCookies } from "../../../utils/cookies";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";

export const actions = {
    LOGIN,
    LOGOUT,
    SET_PROFILE_INFO,
};

export const logIn = (authToken: string): AnyAction => {
    // Set authToken as a cookie on the client side
    setAuthTokenInCookies(authToken);

    // Return an action object with the appropriate type and payload
    return {
        type: actions.LOGIN,
        payload: authToken,
    };
};

export const logOut = () => {
    return async (dispatch: (type: Action) => void): Promise<void> => {
        // Remove authToken from both the Redux state and as a cookie
        dispatch({ type: actions.LOGOUT });
        removeAuthTokenFromCookies();

        // Wait for the authToken to be removed before redirecting
        await new Promise(resolve => setTimeout(resolve, 0));

        // Redirect to the "/" page
        window.location.href = "/";
    };
};

export const setUser = (user: User) => ({ type: SET_PROFILE_INFO, payload: user });