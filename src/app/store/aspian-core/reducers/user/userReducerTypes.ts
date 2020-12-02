import {IUser} from "../../../../models/aspian-core/user";

export interface IUserStateType {
    user: IUser | null;
    submitting: boolean;
    loginError: string;
    isAppLoaded: boolean;
}