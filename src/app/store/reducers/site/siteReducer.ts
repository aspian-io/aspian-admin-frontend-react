import {ISiteStateType} from "./siteReducerTypes";
import {SiteAction, SiteActionTypes} from "../../actions";

const initialState: ISiteStateType = {
    site: null
}

export const siteReducer = (state = initialState, action: SiteAction) => {
    switch (action.type) {
        case SiteActionTypes.GET_SITE_INFO:
            return {...state, ...action.payload};
        default:
            return state;
    }
}