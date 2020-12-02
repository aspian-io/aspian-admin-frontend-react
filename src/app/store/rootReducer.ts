import {combineReducers} from "redux";
import {siderReducer} from "./aspian-core/reducers/layout/sider/siderReducer";
import {IStoreState} from "./rootReducerTypes";
import {resultPageReducer} from "./aspian-core/reducers/layout/result/resultPageReducer";
import {localeReducer} from "./aspian-core/reducers/locale/localeReducer";
import {userReducer} from "./aspian-core/reducers/user/userReducer";
import {taxonomyReducer} from "./aspian-core/reducers/taxonomy/taxonomyReducer";
import {attachmentReducer} from "./aspian-core/reducers/attachment/attachmentReducer";
import {postReducer} from "./aspian-core/reducers/post/postReducer";

const reducers = combineReducers<IStoreState>({
    sider: siderReducer,
    resultPage: resultPageReducer,
    locale: localeReducer,
    userState: userReducer,
    taxonomy: taxonomyReducer,
    attachment: attachmentReducer,
    post: postReducer
});

export default reducers;