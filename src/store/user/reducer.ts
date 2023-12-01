import { Action, User } from "../types";
import { actions } from "./actions";

const initialState: User = {
    id: null,
    firstname: "",
    lastname: "",
    location: "",
    bio: "",
    authToken: undefined,
    isLoggedIn: false,
};

export const userReducer = (state: User = initialState, action: Action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                authToken: action.payload,
                isLoggedIn: true,
            };
        case actions.LOGOUT:
            return {
                ...state,
                authToken: null,
                isLoggedIn: false,
            };
        case actions.SETLOGGED:
            return {
                ...state,
                isLoggedIn: true
            };
        case actions.SET_PROFILE_INFO:
            const { id, firstname, lastname, location, bio } = action.payload;
            return {
                ...state,
                id,
                firstname,
                lastname,
                location,
                bio,
                isLoggedIn: true,
            };
        case actions.SET_DASHBOARD_INFO:
            const { balance, totalIncome, totalExpenses, transactions } = action.payload;
            return {
                ...state,
                id: action.payload.id,
                balance,
                totalIncome,
                totalExpenses,
                transactions,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};