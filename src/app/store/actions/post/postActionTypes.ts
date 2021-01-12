import {IPost, IPostInitFormValues, IPostSubmitFormValues, PostVisibilityEnum} from "../../../models/post";
import {ITreeData} from "../../../../components/post/postCreate/Categories";
import {ReactText} from "react";
import {EventValue} from "rc-picker/lib/interface";
import moment, {Moment} from "moment";
import {DayRange} from "react-modern-calendar-datepicker";
import {Dayjs} from "dayjs";
import {IFileBrowserAntdTable} from "../../../../components/media/fileBrowser/types";

////////////////////////
/// Root Action Type ///
////////////////////////
export type PostAction =
    IPostLoadingInitialAction
    | IPostSubmittingAction
    | IPostTreeSelectLoadingAction
    | IGetPostsAction
    | IGetSinglePostAction
    | IPostCreateInitAction
    | IClearPostInitFormValuesAction
    | IClearSinglePostStateAction
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
    | ISetPostContentAction
    | ICreatePostSetAddedFileNumberToUppyAction
    | ISetIsScheduledAction
    | ISetConfirmedScheduleDateAction
    | ISetConfirmedScheduleTimeAction
    | ISetConfirmedScheduleDateAndTimeAction
    | ISetPostFormLoadingStateAction
    | ISetPostFormValuesAction
    | ISetIsPinnedAction
    | ISetIsPendingAction
    | ISetPostExcerptAction
    | ISetIsCommentAllowedAction
    | ICreatePostAction
    | IEditPostAction
    | ISetPublishScheduledBtnTxtAction
    | ISetSchedulePopoverDateAction
    | ISetSchedulePopoverTimeAction
    | ISetJalaliDateAction
    | ISetFeaturedImagesAction
    | ISetFeaturedVideosAction
    | ISetDefaultFeaturedMediaAction
    | ISetCategoryTreeSelectChosenValuesAction
    | ISetTagsAction;

/////////////
/// Types ///
/////////////
export enum PostActionTypes {
    POST_LOADING_INITIAL = "POST_LOADING_INITIAL",
    SUBMITTING_IN_POST_FORMS = "SUBMITTING_IN_POST_FORMS",
    POSTS_TREESELECT_LOADING = "POSTS_TREESELECT_LOADING",
    GET_POSTS = "GET_POSTS",
    GET_SINGLE_POST = "GET_SINGLE_POST",
    POST_CREATE_INIT = "POST_CREATE_INIT",
    CLEAR_POST_INIT_VALUES = "CLEAR_POST_INIT_VALUES",
    CLEAR_SINGLE_POST_STATE = "CLEAR_SINGLE_POST_STATE",
    CREATE_POST = "CREATE_POST",
    EDIT_POST = "EDIT_POST",
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
    CREATE_POST_SET_POST_VISIBILITY = "CREATE_POST_SET_POST_VISIBILITY",
    CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY = "CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY",
    SET_IS_SCHEDULED = "SET_IS_SCHEDULED",
    SET_CONFIRMED_SCHEDULE_DATE = "SET_CONFIRMED_SCHEDULE_DATE",
    SET_CONFIRMED_SCHEDULE_TIME = "SET_CONFIRMED_SCHEDULE_TIME",
    SET_CONFIRMED_SCHEDULE_DATE_AND_TIME = "SET_CONFIRMED_SCHEDULE_DATE_AND_TIME",
    SET_POST_FORM_LOADING_STATE = "SET_POST_FORM_LOADING_STATE",
    SET_POST_FORM_VALUES = "SET_POST_FORM_VALUES",
    SET_IS_PINNED = "SET_IS_PINNED",
    SET_IS_PENDING = "SET_IS_PENDING",
    SET_POST_EXCERPT = "SET_POST_EXCERPT",
    SET_IS_COMMENT_ALLOWED = "SET_IS_COMMENT_ALLOWED",
    SET_PUBLISH_SCHEDULED_BTN_TXT = "SET_PUBLISH_SCHEDULED_BTN_TXT",
    SET_SCHEDULE_POPOVER_DATE = "SET_SCHEDULE_POPOVER_DATE",
    SET_SCHEDULE_POPOVER_TIME = "SET_SCHEDULE_POPOVER_TIME",
    SET_JALALI_DATE = "SET_JALALI_DATE",
    SET_FEATURED_IMAGES = "SET_FEATURED_IMAGES",
    SET_FEATURED_VIDEOS = "SET_FEATURED_VIDEOS",
    SET_DEFAULT_FEATURED_MEDIA = "SET_DEFAULT_FEATURED_MEDIA",
    SET_CATEGORY_TREE_SELECT_CHOSEN_VALUES = "SET_CATEGORY_TREE_SELECT_CHOSEN_VALUES",
    SET_TAGS = "SET_TAGS"
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
        post: IPost | null
    }
}

export interface IPostCreateInitAction {
    type: PostActionTypes.POST_CREATE_INIT,
    payload: {
        loadingInitial: boolean,
        postInitFormValues: IPostInitFormValues
    }
}

export interface IClearPostInitFormValuesAction {
    type: PostActionTypes.CLEAR_POST_INIT_VALUES,
    payload: {
        loadingInitial: boolean,
        postInitFormValues: IPostInitFormValues
    }
}

export interface IClearSinglePostStateAction {
    type: PostActionTypes.CLEAR_SINGLE_POST_STATE,
    payload: {
        post: null
    }
}

export interface ILoadAntdTreeSelectCompatiblePostsAction {
    type: PostActionTypes.GET_ANTD_TREESELECT_COMPATIBLE_POSTS,
    payload: {
        postsTreeSelect: ITreeData[],
        postsTreeSelectLoading: boolean
    }
}

export interface ICreatePostAction {
    type: PostActionTypes.CREATE_POST,
    payload: {
        postSubmitFormValues: IPostSubmitFormValues
    }
}

export interface IEditPostAction {
    type: PostActionTypes.EDIT_POST,
    payload: {
        postSubmitFormValues: IPostSubmitFormValues
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
        postVisibility: PostVisibilityEnum
    }
}

export interface ICreatePostSetAddedFileNumberToUppyAction {
    type: PostActionTypes.CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY,
    payload: {
        addedFileNumberToUppy: number
    }
}

export interface ISetIsScheduledAction {
    type: PostActionTypes.SET_IS_SCHEDULED,
    payload: {
        isScheduled: boolean
    }
}

export interface ISetConfirmedScheduleDateAction {
    type: PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE,
    payload: {
        confirmedScheduleDate: moment.Moment
    }
}

export interface ISetConfirmedScheduleTimeAction {
    type: PostActionTypes.SET_CONFIRMED_SCHEDULE_TIME,
    payload: {
        confirmedScheduleTime: moment.Moment
    }
}

export interface ISetConfirmedScheduleDateAndTimeAction {
    type: PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE_AND_TIME,
    payload: {
        confirmedScheduleDateAndTime: string
    }
}

export interface ISetPostFormLoadingStateAction {
    type: PostActionTypes.SET_POST_FORM_LOADING_STATE,
    payload: {
        postFormLoaded: boolean
    }
}

export interface ISetPostFormValuesAction {
    type: PostActionTypes.SET_POST_FORM_VALUES,
    payload: {
        postSubmitFormValues: IPostSubmitFormValues
    }
}

export interface ISetIsPinnedAction {
    type: PostActionTypes.SET_IS_PINNED,
    payload: {
        isPinned: boolean
    }
}

export interface ISetIsPendingAction {
    type: PostActionTypes.SET_IS_PENDING,
    payload: {
        isPending: boolean
    }
}

export interface ISetPostExcerptAction {
    type: PostActionTypes.SET_POST_EXCERPT,
    payload: {
        postExcerpt: string
    }
}

export interface ISetIsCommentAllowedAction {
    type: PostActionTypes.SET_IS_COMMENT_ALLOWED,
    payload: {
        isCommentAllowed: boolean
    }
}

export interface ISetPublishScheduledBtnTxtAction {
    type: PostActionTypes.SET_PUBLISH_SCHEDULED_BTN_TXT,
    payload: {
        publishScheduledBtnTxt: string
    }
}

export interface ISetSchedulePopoverDateAction {
    type: PostActionTypes.SET_SCHEDULE_POPOVER_DATE,
    payload: {
        schedulePopoverDate: moment.Moment;
        jalaliDate: Dayjs;
    }
}

export interface ISetSchedulePopoverTimeAction {
    type: PostActionTypes.SET_SCHEDULE_POPOVER_TIME,
    payload: {
        schedulePopoverTime: moment.Moment
    }
}

export interface ISetJalaliDateAction {
    type: PostActionTypes.SET_JALALI_DATE,
    payload: {
        jalaliDate: Dayjs
    }
}

export interface ISetFeaturedImagesAction {
    type: PostActionTypes.SET_FEATURED_IMAGES,
    payload: {
        featuredImages: IFileBrowserAntdTable[]
    }
}

export interface ISetFeaturedVideosAction {
    type: PostActionTypes.SET_FEATURED_VIDEOS,
    payload: {
        featuredVideos: IFileBrowserAntdTable[]
    }
}

export interface ISetDefaultFeaturedMediaAction {
    type: PostActionTypes.SET_DEFAULT_FEATURED_MEDIA,
    payload: {
        defaultFeaturedMedia: string
    }
}

export interface ISetCategoryTreeSelectChosenValuesAction {
    type: PostActionTypes.SET_CATEGORY_TREE_SELECT_CHOSEN_VALUES,
    payload: {
        selectedCategories: { value: string, label: string }[]
    }
}

export interface ISetTagsAction {
    type: PostActionTypes.SET_TAGS,
    payload: {
        tags: string[]
    }
}