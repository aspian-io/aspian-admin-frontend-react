////////////////////////
/// Root Action Type ///
////////////////////////
export type LocaleAction = IHandleChangeLanguageAction | ISetIsLangBtnDisabledAction;

/////////////
/// Types ///
/////////////
export enum LocaleActionTypes {
    CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
    SET_IS_LANG_BTN_DISABLED = "SET_IS_LANG_BTN_DISABLED"
}

////////////////////
/// Action Types ///
////////////////////
export interface IHandleChangeLanguageAction {
    type: LocaleActionTypes.CHANGE_LANGUAGE;
    payload: {
        lang: LanguageActionTypeEnum,
        dir: DirectionActionTypeEnum
    };
}

export interface ISetIsLangBtnDisabledAction {
    type: LocaleActionTypes.SET_IS_LANG_BTN_DISABLED;
    payload: {
        isLangBtnDisabled: boolean
    };
}



// Enums
export enum LocaleVariableEnum {
    ASPIAN_CMS_LANG = 'aspianCmsLang',
    ASPIAN_CMS_DIR = 'aspianCmsDir',
}

export enum LanguageActionTypeEnum {
    en = 'en',
    fa = 'fa',
}

export enum DirectionActionTypeEnum {
    LTR = 'LTR',
    RTL = 'RTL',
}