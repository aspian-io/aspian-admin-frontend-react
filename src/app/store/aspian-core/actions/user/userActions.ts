import {IUserFormValues} from "../../../../models/aspian-core/user";
import {Dispatch} from "redux";
import agent from "../../../../api/aspian-core/agent";
import {
    IGetCurrentUserAction,
    ILoginAction,
    ILogoutAction,
    ISetAppLoadedAction,
    IUserSubmittingAction,
    UserActionTypes
} from "./userActionTypes";
import common from "../../../../api/common";
import {history} from "../../../../..";


// Submitting (loading indicator) action
export const setUserSubmitting = (submitting: boolean = false): IUserSubmittingAction => {
    return {
        type: UserActionTypes.USER_SUBMITTING,
        payload: {submitting}
    }
}

// Login Action
export const login = (values: IUserFormValues) => async (dispatch: Dispatch) => {
    try {
        setUserSubmitting(true);
        common.SetLogin();
        const user = await agent.User.login(values);

        common.SetAuthHeader(user.token);
        history.push('/admin');

        dispatch<ILoginAction>({
            type: UserActionTypes.LOGIN,
            payload: {
                user,
                submitting: false,
                loginError: ''
            }
        });

    } catch (error) {
        console.log(error);

        if (error.status === 401) {
            dispatch<ILoginAction>({
                type: UserActionTypes.LOGIN,
                payload: {
                    user: null,
                    submitting: false,
                    loginError: 'Username or password is not correct!'
                }
            });
        } else {
            dispatch<ILoginAction>({
                type: UserActionTypes.LOGIN,
                payload: {
                    user: null,
                    submitting: false,
                    loginError: `Error code: ${error.status} - ${error.statusText}`
                }
            });
        }
    }
}

export const getCurrentUser = () => async (dispatch: Dispatch) => {
    try {
        const user = await agent.User.current();

        dispatch<IGetCurrentUserAction>({
            type: UserActionTypes.GET_CURRENT_USER,
            payload: {user}
        });
    } catch (error) {
        history.push('/login');
        console.log(error.message);
    }
}

export const setAppLoaded = (isAppLoaded: boolean = true): ISetAppLoadedAction => {
    return {
        type: UserActionTypes.SET_APP_LOADED,
        payload: {isAppLoaded}
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    try {
        setAppLoaded(false);
        await agent.User.logout();

        dispatch<ILogoutAction>({
            type: UserActionTypes.LOGOUT,
            payload: {
                user: null,
                isAppLoaded: true
            }
        });
        common.SetAuthHeader('');
        common.SetLogout();
        history.push('/login');
    } catch (error) {
        console.log(error);

        setAppLoaded(true);
    }
}