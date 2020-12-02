import {IPost} from "../../../../models/aspian-core/post";
import {ITreeData} from "../../../../../components/aspian-core/post/postCreate/Categories";
import {ReactText} from "react";
import {EventValue} from "rc-picker/lib/interface";
import {Moment} from "moment";
import {DayRange} from "react-modern-calendar-datepicker";

////////////////////////
/// Root Action Type ///
////////////////////////
export type PostAction =
    IPostLoadingInitialAction
    | IPostSubmittingAction
    | IPostTreeSelectLoadingAction
    | IGetPostsAction
    | IGetSinglePostAction
    | ILoadAntdTreeSelectCompatiblePostsAction
    | IDeletePostsAction
    | IDeletePostAction
    | IRemoveAddNewPostTinyMceInstanceAction
    | IPostSetCurrentPageAction
    | ISetSelectedRowKeysAction
    | ISetDeleteRangeBtnAction
    | ISetSearchTextAction
    | ISetDateRangeAction
    | ISetSearchedColumnAction
    | ISetPostListWindowWidthAction
    | ISetPostListSelectedDayRangeAction
    | IPostSetTargetBtnAction
    | IPostSetPublishBtnTxtAction
    | ICreatePostSetUploadAsPublicAction
    | ICreatePostSetPostVisibilityAction
    | ISetPostContentAction;

/////////////
/// Types ///
/////////////
export enum PostActionTypes {
    POST_LOADING_INITIAL = "POST_LOADING_INITIAL",
    SUBMITTING_IN_POST_FORMS = "SUBMITTING_IN_POST_FORMS",
    POSTS_TREESELECT_LOADING = "POSTS_TREESELECT_LOADING",
    GET_POSTS = "GET_POSTS",
    GET_SINGLE_POST = "GET_SINGLE_POST",
    GET_ANTD_TREESELECT_COMPATIBLE_POSTS = "GET_ANTD_TREESELECT_COMPATIBLE_POSTS",
    DELETE_SELECTED_POSTS = "DELETE_SELECTED_POSTS",
    DELETE_SINGLE_POST = "DELETE_SINGLE_POST",
    SET_POST_CONTENT = "SET_POST_CONTENT",
    REMOVE_ADD_NEW_POST_TINYMCE_INSTANCE = "REMOVE_ADD_NEW_POST_TINYMCE_INSTANCE",
    POST_LIST_SET_CURRENT_PAGE = "POST_LIST_SET_CURRENT_PAGE",
    POST_LIST_SET_SELECTED_ROW_KEYS = "POST_LIST_SET_SELECTED_ROW_KEYS",
    POST_LIST_SET_DELETE_RANGE_BTN = "POST_LIST_SET_DELETE_RANGE_BTN",
    POST_LIST_SET_SEARCH_TEXT = "POST_LIST_SET_SEARCH_TEXT",
    POST_LIST_SET_DATE_RANGE = "POST_LIST_SET_DATE_RANGE",
    POST_LIST_SET_SEARCHED_COLUMN = "POST_LIST_SET_SEARCHED_COLUMN",
    POST_LIST_SET_WINDOW_WIDTH = "POST_LIST_SET_WINDOW_WIDTH",
    POST_LIST_SET_SELECTED_DAY_RANGE = "POST_LIST_SET_SELECTED_DAY_RANGE",
    POST_SET_TARGET_BTN = "POST_SET_TARGET_BTN",
    POST_SET_PUBLISH_BTN_TXT = "POST_SET_PUBLISH_BTN_TXT",
    CREATE_POST_SET_UPLOAD_AS_PUBLIC = "CREATE_POST_SET_UPLOAD_AS_PUBLIC",
    CREATE_POST_SET_POST_VISIBILITY = "CREATE_POST_SET_POST_VISIBILITY"
}

////////////////////
/// Action Types ///
////////////////////
export interface IPostLoadingInitialAction {
    type: PostActionTypes.POST_LOADING_INITIAL;
    payload: {
        loadingInitial: boolean
    };
}

export interface IPostSubmittingAction {
    type: PostActionTypes.SUBMITTING_IN_POST_FORMS;
    payload: {
        submitting: boolean
    };
}

export interface IPostTreeSelectLoadingAction {
    type: PostActionTypes.POSTS_TREESELECT_LOADING;
    payload: {
        postsTreeSelectLoading: boolean
    };
}

export interface IGetPostsAction {
    type: PostActionTypes.GET_POSTS,
    payload: {
        loadingInitial: boolean,
        posts: IPost[],
        postCount: number,
        maxAttachmentsNumber: number,
        maxChildPosts: number,
        maxComments: number,
        maxViewCount: number
    }
}

export interface IGetSinglePostAction {
    type: PostActionTypes.GET_SINGLE_POST,
    payload: {
        loadingInitial: boolean,
        post: IPost | undefined
    }
}

export interface ILoadAntdTreeSelectCompatiblePostsAction {
    type: PostActionTypes.GET_ANTD_TREESELECT_COMPATIBLE_POSTS,
    payload: {
        postsTreeSelect: ITreeData[],
        postsTreeSelectLoading: boolean
    }
}

export interface IDeletePostsAction {
    type: PostActionTypes.DELETE_SELECTED_POSTS,
    payload: {
        ids: string[],
        submitting: boolean
    }
}

export interface IDeletePostAction {
    type: PostActionTypes.DELETE_SINGLE_POST,
    payload: {
        id: string,
        submitting: boolean
    }
}

export interface ISetPostContentAction {
    type: PostActionTypes.SET_POST_CONTENT,
    payload: {
        postEditorContent: string
    }
}

export interface IRemoveAddNewPostTinyMceInstanceAction {
    type: PostActionTypes.REMOVE_ADD_NEW_POST_TINYMCE_INSTANCE,
    payload: {
        postEditorContent: string
    }
}

export interface IPostSetCurrentPageAction {
    type: PostActionTypes.POST_LIST_SET_CURRENT_PAGE,
    payload: {
        currentPage: number
    }
}

export interface ISetSelectedRowKeysAction {
    type: PostActionTypes.POST_LIST_SET_SELECTED_ROW_KEYS,
    payload: {
        selectedRowKeys: ReactText[]
    }
}

export interface ISetDeleteRangeBtnAction {
    type: PostActionTypes.POST_LIST_SET_DELETE_RANGE_BTN,
    payload: {
        deleteRangeBtn: boolean
    }
}

export interface ISetSearchTextAction {
    type: PostActionTypes.POST_LIST_SET_SEARCH_TEXT,
    payload: {
        searchText: ReactText
    }
}

export interface ISetDateRangeAction {
    type: PostActionTypes.POST_LIST_SET_DATE_RANGE,
    payload: {
        dateRange: [EventValue<Moment>, EventValue<Moment>]
    }
}

export interface ISetSearchedColumnAction {
    type: PostActionTypes.POST_LIST_SET_SEARCHED_COLUMN,
    payload: {
        searchedColumn: string | number | ReactText[] | undefined
    }
}

export interface ISetPostListWindowWidthAction {
    type: PostActionTypes.POST_LIST_SET_WINDOW_WIDTH,
    payload: {
        postListWindowWidth: number
    }
}

export interface ISetPostListSelectedDayRangeAction {
    type: PostActionTypes.POST_LIST_SET_SELECTED_DAY_RANGE,
    payload: {
        selectedDayRange: DayRange
    }
}

export interface IPostSetTargetBtnAction {
    type: PostActionTypes.POST_SET_TARGET_BTN,
    payload: {
        targetBtn: string
    }
}

export interface IPostSetPublishBtnTxtAction {
    type: PostActionTypes.POST_SET_PUBLISH_BTN_TXT,
    payload: {
        publishBtnTxt: string
    }
}

export interface ICreatePostSetUploadAsPublicAction {
    type: PostActionTypes.CREATE_POST_SET_UPLOAD_AS_PUBLIC,
    payload: {
        createPostUploadAsPublic: boolean
    }
}

export interface ICreatePostSetPostVisibilityAction {
    type: PostActionTypes.CREATE_POST_SET_POST_VISIBILITY,
    payload: {
        postVisibility: string
    }
}