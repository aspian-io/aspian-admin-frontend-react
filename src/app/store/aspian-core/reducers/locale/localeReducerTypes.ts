import {DirectionActionTypeEnum, LanguageActionTypeEnum} from "../../actions";

export interface ILocaleStateType {
    lang: LanguageActionTypeEnum;
    dir: DirectionActionTypeEnum;
}