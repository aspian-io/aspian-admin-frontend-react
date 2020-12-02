import {
    DirectionActionTypeEnum,
    LanguageActionTypeEnum,
    LocaleActionTypes,
    LocaleVariableEnum
} from "./localeActionTypes";

export const handleChangeLanguage = (lang: LanguageActionTypeEnum = LanguageActionTypeEnum.en) => {
    localStorage.setItem(LocaleVariableEnum.ASPIAN_CMS_LANG, lang);

    // For English language
    if (lang === LanguageActionTypeEnum.en) {
        localStorage.setItem(
            LocaleVariableEnum.ASPIAN_CMS_DIR,
            DirectionActionTypeEnum.LTR
        );
        return {
            type: LocaleActionTypes.CHANGE_LANGUAGE,
            payload: {
                lang,
                dir: DirectionActionTypeEnum.LTR
            }
        }
    }

    // For Persian (Farsi) language
    if (lang === LanguageActionTypeEnum.fa) {
        localStorage.setItem(
            LocaleVariableEnum.ASPIAN_CMS_DIR,
            DirectionActionTypeEnum.RTL
        );
        return {
            type: LocaleActionTypes.CHANGE_LANGUAGE,
            payload: {
                lang,
                dir: DirectionActionTypeEnum.RTL
            },
        }
    }
}