import {IUser} from "../../../models/user";

export interface IUserStateType {
    readonly user: IUser | null;
    readonly submitting: boolean;
    readonly loginError: string;
    readonly isAppLoaded: boolean;
}