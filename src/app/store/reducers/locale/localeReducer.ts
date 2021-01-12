import {ILocaleStateType} from "./localeReducerTypes";
import {
    DirectionActionTypeEnum,
    LanguageActionTypeEnum,
    LocaleAction,
    LocaleActionTypes,
    LocaleVariableEnum
} from "../../actions";

const localStorageInitialLang =
    localStorage.getItem(LocaleVariableEnum.ASPIAN_CMS_LANG) !== null
        ? (localStorage.getItem(
        LocaleVariableEnum.ASPIAN_CMS_LANG
        ) as keyof typeof LanguageActionTypeEnum)
        : LanguageActionTypeEnum.en;
// Convert local storage string value to an anum key for direction
const localStorageInitialDir =
    localStorage.getItem(LocaleVariableEnum.ASPIAN_CMS_DIR) !== null
        ? (localStorage.getItem(
        LocaleVariableEnum.ASPIAN_CMS_DIR
        ) as keyof typeof DirectionActionTypeEnum)
        : DirectionActionTypeEnum.LTR;

// Convert local storage string value to enum for language and saving it in initialLang const for further usage
const initialLang = LanguageActionTypeEnum[localStorageInitialLang];
// Convert local storage string value to enum for direction and saving it in initialDir const for further usage
const initialDir = DirectionActionTypeEnum[localStorageInitialDir];

const initialState: ILocaleStateType = {
    lang: initialLang,
    dir: initialDir,
    isLangBtnDisabled: false
}

export const localeReducer = (state = initialState, action: LocaleAction) => {
    switch (action.type) {
        case LocaleActionTypes.CHANGE_LANGUAGE:
            return {...state, ...action.payload};
        case LocaleActionTypes.SET_IS_LANG_BTN_DISABLED:
            return {...state, ...action.payload};
        default:
            return state;
    }
}