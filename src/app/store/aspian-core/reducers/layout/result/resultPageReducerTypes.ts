import {ResultStatusEnum} from "../../../actions/layout/result/resultPageActionTypes";

export interface IResultPageStateType {
    status: ResultStatusEnum;
    title: string;
    subTitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    ghostBtnText: string;
    ghostBtnLink: string;
    errorMsgList: string[];
}