import { Action, RootState, User } from "../types";
import { fetchProfileData } from "@/pages/api/profile";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Cookies from 'js-cookie';
import { removeAuthTokenFromCookies, setAuthTokenInCookies } from "../../../utils/cookies";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_PROFILE_INFO = "GET_PROFILE_INFO";

export const actions = {
    LOGIN,
    LOGOUT,
    GET_PROFILE_INFO,
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

export const setProfileInfo = () => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>, getState: () => RootState) => {
        try {
            const authToken = getState().user.isLoggedIn ? getState().user.authToken : undefined;
            const user = await fetchProfileData(authToken);
            dispatch(setUser(user));
        } catch (error) {
            console.error(error);
        }
    };
};

export const setUser = (user: User) => ({ type: GET_PROFILE_INFO, payload: user });