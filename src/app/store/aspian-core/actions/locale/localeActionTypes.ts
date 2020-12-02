////////////////////////
/// Root Action Type ///
////////////////////////
export type LocaleAction = IHandleChangeLanguageAction;

/////////////
/// Types ///
/////////////
export enum LocaleActionTypes {
    CHANGE_LANGUAGE = "CHANGE_LANGUAGE"
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