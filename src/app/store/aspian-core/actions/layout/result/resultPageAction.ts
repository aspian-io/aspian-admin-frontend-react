import {ResultPageActionTypes, ResultStatusEnum} from "./resultPageActionTypes";

export const setResultPage = (
    status: ResultStatusEnum = ResultStatusEnum.Info,
    title: string = '',
    subTitle: string = '',
    primaryBtnText: string = '',
    primaryBtnLink: string = '',
    ghostBtnText: string = '',
    ghostBtnLink: string = '',
    errorMsgList: string[] = []
) => {
    return {
        type: ResultPageActionTypes.RESULT_PAGE_INIT,
        payload: {
            status,
            title,
            subTitle,
            primaryBtnText,
            primaryBtnLink,
            ghostBtnText,
            ghostBtnLink,
            errorMsgList
        }
    }
}