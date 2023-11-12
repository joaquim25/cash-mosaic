import { Action, User } from "../types";
import { actions } from "./actions";

const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem("authToken") : null;

const initialState: User = {
    id: null,
    firstname: "",
    lastname: "",
    location: "",
    bio: "",
    isLoggedIn: authToken ? true : false,
};

export const userReducer = (state: User = initialState, action: Action) => {
    switch (action.type) {
        case actions.LOGIN:
            localStorage.setItem("authToken", action.payload);
            return {
                ...state,
                isLoggedIn: true,
            };
        case actions.LOGOUT:
            localStorage.removeItem("authToken");
            return {
                ...state,
                isLoggedIn: false,
            };
        case actions.GET_PROFILE_INFO:
            console.log("[reducer.ts] payload: ", action.payload)
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