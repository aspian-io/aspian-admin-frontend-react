import {IPostStateType} from "./postReducerTypes";
import {PostAction, PostActionTypes} from "../../actions";
import {PostInitFormValues, PostSubmitFormValues} from "../../../models/post";
import moment from "moment";
import i18n from '../../../../locales/i18n';
import dayjs from "dayjs";
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

// @ts-ignore
dayjs.calendar('jalali');

const initialState: IPostStateType = {
    posts: [],
    post: null,
    loadingInitial: false,
    submitting: false,
    postsTreeSelectLoading: false,
    postsTreeSelect: [],
    postCount: 0,
    maxAttachmentsNumber: 0,
    maxViewCount: 0,
    maxPostHistories: 0,
    maxComments: 0,
    maxChildPosts: 0,
    currentPage: 1,
    selectedRowKeys: [],
    deleteRangeBtn: true,
    searchText: '',
    dateRange: [null, null],
    searchedColumn: '',
    postListWindowWidth: window.innerWidth,
    selectedDayRange: {from: null, to: null},
    targetBtn: '',
    createPostUploadAsPublic: false,
    addedFileNumberToUppy: 0,
    postFormLoaded: false,
    postSubmitFormValues: new PostSubmitFormValues(),
    postInitFormValues: new PostInitFormValues(),
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
        case PostActionTypes.CREATE_POST:
            return {...state, ...action.payload}
        case PostActionTypes.EDIT_POST:
            return {...state, ...action.payload}
        case PostActionTypes.DELETE_SELECTED_POSTS:
            return {
                ...state,
                ...action.payload,
                ...action.payload.ids.map((id) => state.posts.filter((post) => post.id !== id))
            };
        case PostActionTypes.DELETE_SINGLE_POST:
            return {
                ...state,
                ...action.payload,
                postRegistry: state.posts.filter(post => post.id !== action.payload.id)
            };
        case PostActionTypes.GET_SINGLE_POST:
            return {...state, ...action.payload}
        case PostActionTypes.CLEAR_SINGLE_POST_STATE:
            return {...state, ...action.payload}
        case PostActionTypes.POST_CREATE_INIT:
            return {...state, ...action.payload}
        case PostActionTypes.CLEAR_POST_INIT_VALUES:
            return {...state, ...action.payload}
        case PostActionTypes.SET_POST_CONTENT:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    content: action.payload.postEditorContent
                }
            }
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
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    publishBtnTxt: action.payload.publishBtnTxt
                }
            }
        case PostActionTypes.CREATE_POST_SET_UPLOAD_AS_PUBLIC:
            return {...state, ...action.payload}
        case PostActionTypes.CREATE_POST_SET_POST_VISIBILITY:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    visibility: action.payload.postVisibility
                }
            }
        case PostActionTypes.CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY:
            return {...state, ...action.payload}
        case PostActionTypes.SET_IS_SCHEDULED:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    isScheduled: action.payload.isScheduled
                }
            }
        case PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    confirmedScheduleDate: action.payload.confirmedScheduleDate
                }
            }
        case PostActionTypes.SET_CONFIRMED_SCHEDULE_TIME:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    confirmedScheduleTime: action.payload.confirmedScheduleTime
                }
            }
        case PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE_AND_TIME:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    confirmedScheduleDateAndTime: action.payload.confirmedScheduleDateAndTime
                }
            }
        case PostActionTypes.SET_POST_FORM_LOADING_STATE:
            return {...state, ...action.payload}
        case PostActionTypes.SET_POST_FORM_VALUES:
            return {...state, ...action.payload}
        case PostActionTypes.SET_IS_PENDING:
            return {
                ...state,
                postInitFormValues: {...state.postInitFormValues, isPending: action.payload.isPending}
            }
        case PostActionTypes.SET_IS_PINNED:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    isPinned: action.payload.isPinned
                }
            }
        case PostActionTypes.SET_IS_COMMENT_ALLOWED:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    isCommentAllowed: action.payload.isCommentAllowed
                }
            }
        case PostActionTypes.SET_POST_EXCERPT:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    excerpt: action.payload.postExcerpt
                }
            }
        case PostActionTypes.SET_PUBLISH_SCHEDULED_BTN_TXT:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    publishScheduledBtnTxt: action.payload.publishScheduledBtnTxt
                }
            }
        case PostActionTypes.SET_SCHEDULE_POPOVER_DATE:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    schedulePopoverDate: action.payload.schedulePopoverDate,
                    jalaliDate: action.payload.jalaliDate
                }
            }
        case PostActionTypes.SET_SCHEDULE_POPOVER_TIME:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    schedulePopoverTime: action.payload.schedulePopoverTime
                }
            }
        case PostActionTypes.SET_JALALI_DATE:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    jalaliDate: action.payload.jalaliDate
                }
            }
        case PostActionTypes.SET_DEFAULT_FEATURED_MEDIA:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    defaultFeaturedMedia: action.payload.defaultFeaturedMedia
                }
            }
        case PostActionTypes.SET_FEATURED_IMAGES:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    featuredImages: action.payload.featuredImages
                }
            }
        case PostActionTypes.SET_FEATURED_VIDEOS:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    featuredVideos: action.payload.featuredVideos
                }
            }
        case PostActionTypes.SET_CATEGORY_TREE_SELECT_CHOSEN_VALUES:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    selectedCategories: action.payload.selectedCategories
                }
            }
        case PostActionTypes.SET_TAGS:
            return {
                ...state,
                postInitFormValues: {
                    ...state.postInitFormValues,
                    tags: action.payload.tags
                }
            }
        default:
            return state;
    }
}