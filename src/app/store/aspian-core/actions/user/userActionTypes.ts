import {IUser} from "../../../../models/aspian-core/user";

////////////////////////
/// Root Action Type ///
////////////////////////
export type UserAction = ILoginAction | IUserSubmittingAction | IGetCurrentUserAction | ISetAppLoadedAction | ILogoutAction;

/////////////
/// Types ///
/////////////
export enum UserActionTypes {
    LOGIN = "LOGIN",
    USER_SUBMITTING = "USER_SUBMITTING",
    GET_CURRENT_USER = "GET_CURRENT_USER",
    SET_APP_LOADED = "SET_APP_LOADED",
    LOGOUT = "LOGOUT"
}

////////////////////
/// Action Types ///
////////////////////
export interface IUserSubmittingAction {
    type: UserActionTypes.USER_SUBMITTING;
    payload: {
        submitting: boolean
    };
}

export interface ILoginAction {
    type: UserActionTypes.LOGIN;
    payload: {
        user: IUser | null,
        submitting: boolean,
        loginError: string
    };
}

export interface IGetCurrentUserAction {
    type: UserActionTypes.GET_CURRENT_USER,
    payload: { user: IUser | null }
}

export interface ISetAppLoadedAction {
    type: UserActionTypes.SET_APP_LOADED,
    payload: { isAppLoaded: boolean }
}

export interface ILogoutAction {
    type: UserActionTypes.LOGOUT,
    payload: { user: IUser | null, isAppLoaded: boolean }
}