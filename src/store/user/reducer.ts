import { Action, User } from "@/types";
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
        case actions.SET_USER:
            return {
                id: action.payload.id,
                name: action.payload.name,
                lists: action.payload.user_lists,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};
