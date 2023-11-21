import { Action, User } from "../types";
import { actions } from "./actions";

const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem("authToken") : null;

const initialState: User = {
    id: null,
    firstname: "",
    lastname: "",
    location: "",
    bio: "",
    authToken: undefined,
    isLoggedIn: authToken ? true : false,
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
        default:
            return state;
    }
};