import {combineReducers} from "redux";
import {siderReducer} from "./reducers/layout/sider/siderReducer";
import {IStoreState} from "./rootReducerTypes";
import {resultPageReducer} from "./reducers/layout/result/resultPageReducer";
import {localeReducer} from "./reducers/locale/localeReducer";
import {userReducer} from "./reducers/user/userReducer";
import {taxonomyReducer} from "./reducers/taxonomy/taxonomyReducer";
import {attachmentReducer} from "./reducers/attachment/attachmentReducer";
import {postReducer} from "./reducers/post/postReducer";
import {siteReducer} from "./reducers/site/siteReducer";

const reducers = combineReducers<IStoreState>({
    sider: siderReducer,
    resultPage: resultPageReducer,
    locale: localeReducer,
    userState: userReducer,
    taxonomy: taxonomyReducer,
    attachment: attachmentReducer,
    post: postReducer,
    site: siteReducer
});

export default reducers;