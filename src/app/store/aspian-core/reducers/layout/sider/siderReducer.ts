import {SiderAction, SiderActionTypes} from "../../../actions";
import {ISiderStateType} from "./siderReducerTypes";

const initialState: ISiderStateType = {
    collapsed: false
}

export const siderReducer = (state = initialState, action: SiderAction) => {
    switch (action.type) {
        case SiderActionTypes.TOGGLE_SIDER:
        case SiderActionTypes.TOGGLE_SIDER_ON_BREAKPOINT:
            return {...state, ...action.payload};
        default:
            return state;
    }
}