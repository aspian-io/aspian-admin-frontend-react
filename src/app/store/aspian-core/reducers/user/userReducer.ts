import {IUserStateType} from "./userReducerTypes";
import {UserAction, UserActionTypes} from "../../actions";

const initialState: IUserStateType = {
    user: null,
    submitting: false,
    loginError: '',
    isAppLoaded: false
}

export const userReducer = (state = initialState, action: UserAction) => {
    const {type, payload} = action;

    switch (type) {
        case UserActionTypes.USER_SUBMITTING:
            return {...state, ...payload};
        case UserActionTypes.LOGIN:
            return {...state, ...payload};
        case UserActionTypes.GET_CURRENT_USER:
            return {...state, ...payload};
        case UserActionTypes.SET_APP_LOADED:
            return {...state, ...payload};
        case UserActionTypes.LOGOUT:
            return {...state, ...payload};
        default:
            return state;
    }
}