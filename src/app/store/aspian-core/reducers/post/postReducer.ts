import {IPostStateType} from "./postReducerTypes";
import {PostAction, PostActionTypes} from "../../actions";

const initialState: IPostStateType = {
    posts: [],
    post: undefined,
    loadingInitial: true,
    submitting: false,
    postsTreeSelectLoading: false,
    postsTreeSelect: [],
    postCount: 0,
    maxAttachmentsNumber: 0,
    maxViewCount: 0,
    maxPostHistories: 0,
    maxComments: 0,
    maxChildPosts: 0,
    postEditorContent: '',
    currentPage: 1,
    selectedRowKeys: [],
    deleteRangeBtn: true,
    searchText: '',
    dateRange: [null, null],
    searchedColumn: '',
    postListWindowWidth: window.innerWidth,
    selectedDayRange: {from: null, to: null},
    targetBtn: '',
    publishBtnTxt: "Publish",
    createPostUploadAsPublic: false,
    postVisibility: "public",
    addedFileNumberToUppy: 0
}

export const postReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case PostActionTypes.POST_LOADING_INITIAL:
            return {...state, ...action.payload};
        case PostActionTypes.SUBMITTING_IN_POST_FORMS:
            return {...state, ...action.payload};
        case PostActionTypes.POSTS_TREESELECT_LOADING:
            return {...state, ...action.payload};
        case PostActionTypes.GET_POSTS:
            return {...state, ...action.payload};
        case PostActionTypes.GET_ANTD_TREESELECT_COMPATIBLE_POSTS:
            return {...state, ...action.payload};
        case PostActionTypes.DELETE_SELECTED_POSTS:
            return {...state,
                    ...action.payload,
                    ...action.payload.ids.map((id) => state.posts.filter((post) => post.id !== id))};
        case PostActionTypes.DELETE_SINGLE_POST:
            return {
                ...state,
                ...action.payload,
                postRegistry: state.posts.filter(post => post.id !== action.payload.id)
            };
        case PostActionTypes.GET_SINGLE_POST:
            return {...state, ...action.payload}
        case PostActionTypes.SET_POST_CONTENT:
            return {...state, ...action.payload}
        case PostActionTypes.REMOVE_ADD_NEW_POST_TINYMCE_INSTANCE:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_CURRENT_PAGE:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_SELECTED_ROW_KEYS:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_DELETE_RANGE_BTN:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_SEARCH_TEXT:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_DATE_RANGE:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_SEARCHED_COLUMN:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_WINDOW_WIDTH:
            return {...state, ...action.payload}
        case PostActionTypes.POST_LIST_SET_SELECTED_DAY_RANGE:
            return {...state, ...action.payload}
        case PostActionTypes.POST_SET_TARGET_BTN:
            return {...state, ...action.payload}
        case PostActionTypes.POST_SET_PUBLISH_BTN_TXT:
            return {...state, ...action.payload}
        case PostActionTypes.CREATE_POST_SET_UPLOAD_AS_PUBLIC:
            return {...state, ...action.payload}
        case PostActionTypes.CREATE_POST_SET_POST_VISIBILITY:
            return {...state, ...action.payload}
        case PostActionTypes.CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY:
            return {...state, ...action.payload}
        default:
            return state;
    }
}