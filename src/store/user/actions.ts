import { Action, User } from "../types";
import { AnyAction } from "redux";
import { removeAuthTokenFromCookies, setAuthTokenInCookies } from "../../../utils/cookies";
import { getTotalExpenses, getTotalIncome } from "../../../utils/budgetUtils";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SETLOGGED = "SETLOGGED";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";
const SET_DASHBOARD_INFO = "SET_DASHBOARD_INFO";

export const actions = {
    LOGIN,
    LOGOUT,
    SETLOGGED,
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

        // Redirect to the landing page
        window.location.href = "/";
    };
};

export const setLogged = () => {
    return { type: actions.SETLOGGED }
}

export const cleanUser = () => {
    return { type: actions.LOGOUT }
}

export const setUserProfile = (user: User) => {
    return { type: SET_PROFILE_INFO, payload: user }
};

export const setUserDashboard = (user: User) => {
    if (user) {
        const totalIncome = getTotalIncome(user);
        const totalExpenses = getTotalExpenses(user);

        let balance;
        if (typeof totalIncome == "number" && typeof totalExpenses == "number") {
            balance = totalExpenses + totalIncome;
        }

        const id = user.id;

        return {
            type: SET_DASHBOARD_INFO, payload: { ...user, id, balance, totalIncome, totalExpenses }
        }
    } else {
        return {
            type: SET_DASHBOARD_INFO, payload: { id: 0, balance: 0, totalIncome: 0, totalExpenses: 0 }
        }
    }
}