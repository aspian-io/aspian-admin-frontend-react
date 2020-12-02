import {
    ResultPageAction,
    ResultPageActionTypes,
    ResultStatusEnum
} from "../../../actions";
import {IResultPageStateType} from "./resultPageReducerTypes";

const initialState: IResultPageStateType = {
    status: ResultStatusEnum.Info,
    title: '',
    subTitle: '',
    primaryBtnText: '',
    primaryBtnLink: '',
    ghostBtnText: '',
    ghostBtnLink: '',
    errorMsgList: ['']
}

export const resultPageReducer = (state = initialState, action: ResultPageAction) => {
    switch (action.type) {
        case ResultPageActionTypes.RESULT_PAGE_INIT:
            return action.payload;
        default:
            return state;
    }
}