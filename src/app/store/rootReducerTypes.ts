import {IResultPageStateType} from "./aspian-core/reducers/layout/result/resultPageReducerTypes";
import {ILocaleStateType} from "./aspian-core/reducers/locale/localeReducerTypes";
import {IUserStateType} from "./aspian-core/reducers/user/userReducerTypes";
import {ITaxonomyStateType} from "./aspian-core/reducers/taxonomy/taxonomyReducerTypes";
import {ISiderStateType} from "./aspian-core/reducers/layout/sider/siderReducerTypes";
import {IAttachmentStateType} from "./aspian-core/reducers/attachment/attachmentReducerTypes";
import {IPostStateType} from "./aspian-core/reducers/post/postReducerTypes";

export interface IStoreState {
    sider: ISiderStateType;
    resultPage: IResultPageStateType
    locale: ILocaleStateType,
    userState: IUserStateType,
    taxonomy: ITaxonomyStateType,
    attachment: IAttachmentStateType,
    post: IPostStateType
}