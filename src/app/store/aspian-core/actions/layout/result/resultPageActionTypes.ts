////////////////////////
/// Root Action Type ///
////////////////////////
export type ResultPageAction = ISetResultPageAction;

/////////////
/// Types ///
/////////////
export enum ResultPageActionTypes {
    RESULT_PAGE_INIT = "RESULT_PAGE_INIT"
}

////////////////////
/// Action Types ///
////////////////////
export interface ISetResultPageAction {
    type: ResultPageActionTypes.RESULT_PAGE_INIT;
    payload: {
        status: ResultStatusEnum,
        title: string,
        subTitle: string,
        primaryBtnText: string,
        primaryBtnLink: string,
        ghostBtnText: string,
        ghostBtnLink: string,
        errorMsgList: string[]
    };
}


// Result Status Enum
export enum ResultStatusEnum {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
    Code403 = '403',
    Code404 = '404',
    Code500 = '500',
}