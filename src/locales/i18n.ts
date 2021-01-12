import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//import XHR from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next";

// aspian-core ---> US-en translation files
import core__common_US_en from './en/common/common_US-en.json';
import core__dashboard_US_en from './en/dashboard/dashboard_US-en.json';
import core__breadcrumb_US_en from './en/layout/breadcrumb/breadcrumb_US-en.json';
import core__footer_US_en from './en/layout/footer/footer_US-en.json';
import core__header_US_en from './en/layout/header/header_US-en.json';
import core__badRequest_US_en from './en/layout/result/badRequest_US-en.json';
import core__networkProblem_US_en from './en/layout/result/networkProblem_US-en.json';
import core__notFound_US_en from './en/layout/result/notFound_US-en.json';
import core__resultPage_US_en from './en/layout/result/resultPage_US-en.json';
import core__serverError_US_en from './en/layout/result/serverError_US-en.json';
import core__unauthorized401_US_en from './en/layout/result/unauthorized401_US-en.json';
import core__unauthorized403_US_en from './en/layout/result/unauthorized403_US-en.json';
import core__error_US_en from './en/layout/result/error_US-en.json';
import core__sider_US_en from './en/layout/sider/sider_US-en.json';
import core__menu_US_en from './en/layout/sider/menu/menu_US-en.json';
import core__postList_US_en from './en/post/postList/postList_US-en.json';
import core__postDetails_US_en from './en/post/postDetails/postDetails_US-en.json';
import core__postCreate_US_en from './en/post/postCreate/postCreate_US-en.json';
import core__login_US_en from './en/user/login_US-en.json';
import core__register_US_en from './en/user/register_US-en.json';
import core__media_US_en from './en/media/media_US-en.json';

// aspian-core ---> IR-fa translation files
import core__common_IR_fa from './fa/common/common_IR-fa.json';
import core__dashboard_IR_fa from './fa/dashboard/dashboard_IR-fa.json';
import core__breadcrumb_IR_fa from './fa/layout/breadcrumb/breadcrumb_IR-fa.json';
import core__footer_IR_fa from './fa/layout/footer/footer_IR-fa.json';
import core__header_IR_fa from './fa/layout/header/header_IR-fa.json';
import core__badRequest_IR_fa from './fa/layout/result/badRequest_IR-fa.json';
import core__networkProblem_IR_fa from './fa/layout/result/networkProblem_IR-fa.json';
import core__notFound_IR_fa from './fa/layout/result/notFound_IR-fa.json';
import core__resultPage_IR_fa from './fa/layout/result/resultPage_IR-fa.json';
import core__serverError_IR_fa from './fa/layout/result/serverError_IR-fa.json';
import core__unauthorized401_IR_fa from './fa/layout/result/unauthorized401_IR-fa.json';
import core__unauthorized403_IR_fa from './fa/layout/result/unauthorized403_IR-fa.json';
import core__error_IR_fa from './fa/layout/result/error_IR-fa.json';
import core__sider_IR_fa from './fa/layout/sider/sider_IR-fa.json';
import core__menu_IR_fa from './fa/layout/sider/menu/menu_IR-fa.json';
import core__postList_IR_fa from './fa/post/postList/postList_IR-fa.json';
import core__postDetails_IR_fa from './fa/post/postDetails/postDetails_IR-fa.json';
import core__postCreate_IR_fa from './fa/post/postCreate/postCreate_IR-fa.json';
import core__login_IR_fa from './fa/user/login_IR-fa.json';
import core__register_IR_fa from './fa/user/register_IR-fa.json';
import core__media_IR_fa from './fa/media/media_IR-fa.json';
import {LocaleVariableEnum} from "../app/store/actions";


const lng: string =
    localStorage.getItem('aspianCmsLang')
        ? localStorage.getItem('aspianCmsLang')!
        : 'en';

i18n
  .use(initReactI18next)
  // .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng,
    fallbackLng: 'en', // use en if detected lng is not available

    //keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    resources: {
      en: {
        core_common: core__common_US_en,
        core_dashboard: core__dashboard_US_en,
        core_breadcrumb: core__breadcrumb_US_en,
        core_footer: core__footer_US_en,
        core_header: core__header_US_en,
        core_badRequestPage: core__badRequest_US_en,
        core_networkProblemPage: core__networkProblem_US_en,
        core_notFoundPage: core__notFound_US_en,
        core_resultPage: core__resultPage_US_en,
        core_serverErrorPage: core__serverError_US_en,
        core_unauthorized401Page: core__unauthorized401_US_en,
        core_unauthorized403Page: core__unauthorized403_US_en,
        core_error: core__error_US_en,
        core_sider: core__sider_US_en,
        core_menu: core__menu_US_en,
        core_postList: core__postList_US_en,
        core_postDetails: core__postDetails_US_en,
        core_postCreate: core__postCreate_US_en,
        core_login: core__login_US_en,
        core_register: core__register_US_en,
        core_media: core__media_US_en
      },
      fa: {
        core_common: core__common_IR_fa,
        core_dashboard: core__dashboard_IR_fa,
        core_breadcrumb: core__breadcrumb_IR_fa,
        core_footer: core__footer_IR_fa,
        core_header: core__header_IR_fa,
        core_badRequestPage: core__badRequest_IR_fa,
        core_networkProblemPage: core__networkProblem_IR_fa,
        core_notFoundPage: core__notFound_IR_fa,
        core_resultPage: core__resultPage_IR_fa,
        core_serverErrorPage: core__serverError_IR_fa,
        core_unauthorized401Page: core__unauthorized401_IR_fa,
        core_unauthorized403Page: core__unauthorized403_IR_fa,
        core_error: core__error_IR_fa,
        core_sider: core__sider_IR_fa,
        core_menu: core__menu_IR_fa,
        core_postList: core__postList_IR_fa,
        core_postDetails: core__postDetails_IR_fa,
        core_postCreate: core__postCreate_IR_fa,
        core_login: core__login_IR_fa,
        core_register: core__register_IR_fa,
        core_media: core__media_IR_fa
      },
    },
    // have a common namespace used around the full app
    // ns: ['postDetails', 'translations'],
    // defaultNS: 'translations',
  });

export default i18n;
