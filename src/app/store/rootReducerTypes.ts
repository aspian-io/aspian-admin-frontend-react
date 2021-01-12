import {IResultPageStateType} from "./reducers/layout/result/resultPageReducerTypes";
import {ILocaleStateType} from "./reducers/locale/localeReducerTypes";
import {IUserStateType} from "./reducers/user/userReducerTypes";
import {ITaxonomyStateType} from "./reducers/taxonomy/taxonomyReducerTypes";
import {ISiderStateType} from "./reducers/layout/sider/siderReducerTypes";
import {IAttachmentStateType} from "./reducers/attachment/attachmentReducerTypes";
import {IPostStateType} from "./reducers/post/postReducerTypes";
import {ISiteStateType} from "./reducers/site/siteReducerTypes";

export interface IStoreState {
    sider: ISiderStateType;
    resultPage: IResultPageStateType
    locale: ILocaleStateType,
    userState: IUserStateType,
    taxonomy: ITaxonomyStateType,
    attachment: IAttachmentStateType,
    post: IPostStateType,
    site: ISiteStateType
}