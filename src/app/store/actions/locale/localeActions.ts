import {
    DirectionActionTypeEnum, IHandleChangeLanguageAction,
    ISetIsLangBtnDisabledAction,
    LanguageActionTypeEnum,
    LocaleActionTypes,
    LocaleVariableEnum
} from "./localeActionTypes";
import tinymce from 'tinymce/tinymce';
import {setPostContent} from "../post/postActions";
import {Dispatch} from "redux";

export const handleChangeLanguage = (lang: LanguageActionTypeEnum = LanguageActionTypeEnum.en) => (dispath: Dispatch) => {
    localStorage.setItem(LocaleVariableEnum.ASPIAN_CMS_LANG, lang);

    // For English language
    if (lang === LanguageActionTypeEnum.en) {
        localStorage.setItem(
            LocaleVariableEnum.ASPIAN_CMS_DIR,
            DirectionActionTypeEnum.LTR
        );
        dispath<IHandleChangeLanguageAction>({
            type: LocaleActionTypes.CHANGE_LANGUAGE,
            payload: {
                lang,
                dir: DirectionActionTypeEnum.LTR
            }
        })
    }

    // For Persian (Farsi) language
    if (lang === LanguageActionTypeEnum.fa) {
        localStorage.setItem(
            LocaleVariableEnum.ASPIAN_CMS_DIR,
            DirectionActionTypeEnum.RTL
        );
        dispath<IHandleChangeLanguageAction>({
            type: LocaleActionTypes.CHANGE_LANGUAGE,
            payload: {
                lang,
                dir: DirectionActionTypeEnum.RTL
            },
        })
    }

    // PostCreate on language change
    if (tinymce.EditorManager.activeEditor && tinymce.EditorManager.activeEditor.id === "addPostEditor") {
        dispath(setPostContent(tinymce.get("addPostEditor").getContent()));
        //tinymce.remove('#addPostEditor');
    }
}

export const setIsLangBtnDisabled = (isLangBtnDisabled: boolean) : ISetIsLangBtnDisabledAction => {
    return {
        type: LocaleActionTypes.SET_IS_LANG_BTN_DISABLED,
        payload: {isLangBtnDisabled}
    }
}