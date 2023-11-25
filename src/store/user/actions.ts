import { Action, User } from "../types";
import { AnyAction } from "redux";
import { removeAuthTokenFromCookies, setAuthTokenInCookies } from "../../../utils/cookies";
import { getTotalExpenses, getTotalIncome } from "../../../utils/budgetUtils";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";
const SET_DASHBOARD_INFO = "SET_DASHBOARD_INFO";

export const actions = {
    LOGIN,
    LOGOUT,
    SET_PROFILE_INFO,
    SET_DASHBOARD_INFO,
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

        // Redirect to the landing page
        window.location.href = "/";
    };
};

export const setUserProfile = (user: User) => {
    return { type: SET_PROFILE_INFO, payload: user }
};

export const setUserDashboard = (user: User) => {
    const totalIncome = getTotalIncome(user);
    const totalExpenses = getTotalExpenses(user);
    const balance = totalIncome - totalExpenses;
    const id = user.id;

    return {
        type: SET_DASHBOARD_INFO, payload: { ...user, id, balance, totalIncome, totalExpenses }
    }
}