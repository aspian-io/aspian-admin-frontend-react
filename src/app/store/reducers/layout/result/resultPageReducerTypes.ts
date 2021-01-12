import {ResultStatusEnum} from "../../../actions/layout/result/resultPageActionTypes";

export interface IResultPageStateType {
    readonly status: ResultStatusEnum;
    readonly title: string;
    readonly subTitle: string;
    readonly primaryBtnText: string;
    readonly primaryBtnLink: string;
    readonly ghostBtnText: string;
    readonly ghostBtnLink: string;
    readonly errorMsgList: string[];
}