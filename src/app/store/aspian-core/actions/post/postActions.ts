import {
    ICreatePostSetAddedFileNumberToUppyAction,
    ICreatePostSetPostVisibilityAction,
    ICreatePostSetUploadAsPublicAction,
    IDeletePostAction,
    IDeletePostsAction,
    IGetPostsAction,
    IGetSinglePostAction,
    ILoadAntdTreeSelectCompatiblePostsAction,
    IPostLoadingInitialAction,
    IPostSetCurrentPageAction,
    IPostSetPublishBtnTxtAction,
    IPostSetTargetBtnAction,
    IPostSubmittingAction,
    IPostTreeSelectLoadingAction,
    IRemoveAddNewPostTinyMceInstanceAction,
    ISetDateRangeAction,
    ISetDeleteRangeBtnAction,
    ISetPostContentAction,
    ISetPostListSelectedDayRangeAction,
    ISetPostListWindowWidthAction,
    ISetSearchedColumnAction,
    ISetSearchTextAction,
    ISetSelectedRowKeysAction,
    PostActionTypes
} from "./postActionTypes";
import {Dispatch} from "redux";
import agent from "../../../../api/aspian-core/agent";
import tinymce from "tinymce/tinymce";
import {ReactText} from "react";
import {EventValue} from "rc-picker/lib/interface";
import {Moment} from "moment";
import {DayRange} from "react-modern-calendar-datepicker";
import {setIsLangBtnDisabled} from "../locale/localeActions";

export const setPostLoadingInitial = (loadingInitial: boolean): IPostLoadingInitialAction => {
    return {
        type: PostActionTypes.POST_LOADING_INITIAL,
        payload: {loadingInitial}
    }
}

export const setPostSubmitting = (submitting: boolean): IPostSubmittingAction => {
    return {
        type: PostActionTypes.SUBMITTING_IN_POST_FORMS,
        payload: {submitting}
    }
}

export const setPostTreeSelectLoading = (postsTreeSelectLoading: boolean): IPostTreeSelectLoadingAction => {
    return {
        type: PostActionTypes.POSTS_TREESELECT_LOADING,
        payload: {postsTreeSelectLoading}
    }
}

export const loadPosts = (
    limit: number = 3,
    page = 0,
    filterKey = '',
    filterValue = '',
    field = '',
    order = '',
    startDate = '',
    endDate = '',
    startNumber: number | '' = '',
    endNumber: number | '' = ''
) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostLoadingInitial(true));

        const postsEnvelope = await agent.Posts.list(
            limit,
            page,
            filterKey,
            filterValue,
            field,
            order,
            startDate,
            endDate,
            startNumber,
            endNumber
        );

        dispatch<IGetPostsAction>({
            type: PostActionTypes.GET_POSTS,
            payload: {
                posts: postsEnvelope.posts,
                postCount: postsEnvelope.postCount,
                maxAttachmentsNumber: postsEnvelope.maxAttachmentsNumber,
                maxChildPosts: postsEnvelope.maxChildPosts,
                maxComments: postsEnvelope.maxComments,
                maxViewCount: postsEnvelope.maxViewCount,
                loadingInitial: false
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setPostLoadingInitial(false));
    }
}

export const getPost = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostLoadingInitial(true));

        const post = await agent.Posts.details(id);

        dispatch<IGetSinglePostAction>({
            type: PostActionTypes.GET_SINGLE_POST,
            payload: {
                post,
                loadingInitial: false
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setPostLoadingInitial(false));
    }
}

export const loadAntdTreeSelectCompatiblePosts = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostTreeSelectLoading(true));

        const postsTreeSelect = await agent.Posts.antDPostsTreeSelect();

        dispatch<ILoadAntdTreeSelectCompatiblePostsAction>({
            type: PostActionTypes.GET_ANTD_TREESELECT_COMPATIBLE_POSTS,
            payload: {
                postsTreeSelect,
                postsTreeSelectLoading: false
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setPostTreeSelectLoading(false));
    }
}

export const deletePosts = (ids: string[]) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostSubmitting(true));
        await agent.Posts.delete(ids);

        dispatch<IDeletePostsAction>({
            type: PostActionTypes.DELETE_SELECTED_POSTS,
            payload: {
                ids,
                submitting: false
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setPostSubmitting(false));
        throw error;
    }
}

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostSubmitting(true));
        await agent.Posts.delete([id]);

        dispatch<IDeletePostAction>({
            type: PostActionTypes.DELETE_SINGLE_POST,
            payload: {
                id,
                submitting: false
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setPostSubmitting(false));
        throw error;
    }
}

export const setPostContent = (postEditorContent: string): ISetPostContentAction => {
    return {
        type: PostActionTypes.SET_POST_CONTENT,
        payload: {postEditorContent}
    }
}

export const removeAddNewPostTinyMceInstance = (): IRemoveAddNewPostTinyMceInstanceAction => {
    let postEditorContent = "";
    if (tinymce.EditorManager.activeEditor && tinymce.EditorManager.activeEditor.id === "addPostEditor") {
        postEditorContent = tinymce.get("addPostEditor").getContent();
        tinymce.remove('#addPostEditor');
    }

    return {
        type: PostActionTypes.REMOVE_ADD_NEW_POST_TINYMCE_INSTANCE,
        payload: {postEditorContent}
    }
}

export const setCurrentPage = (currentPage: number): IPostSetCurrentPageAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_CURRENT_PAGE,
        payload: {currentPage}
    }
}

export const setSelectedRowKeys = (selectedRowKeys: ReactText[]): ISetSelectedRowKeysAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_SELECTED_ROW_KEYS,
        payload: {selectedRowKeys}
    }
}

export const setDeleteRangeBtn = (deleteRangeBtn: boolean): ISetDeleteRangeBtnAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_DELETE_RANGE_BTN,
        payload: {deleteRangeBtn}
    }
}

export const setSearchText = (searchText: ReactText): ISetSearchTextAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_SEARCH_TEXT,
        payload: {searchText}
    }
}

export const setDateRange = (dateRange: [EventValue<Moment>, EventValue<Moment>]): ISetDateRangeAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_DATE_RANGE,
        payload: {dateRange}
    }
}

export const setSearchedColumn = (searchedColumn: string | number | ReactText[] | undefined): ISetSearchedColumnAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_SEARCHED_COLUMN,
        payload: {searchedColumn}
    }
}

export const setPostListWindowWidth = (postListWindowWidth: number): ISetPostListWindowWidthAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_WINDOW_WIDTH,
        payload: {postListWindowWidth}
    }
}

export const setSelectedDayRange = (selectedDayRange: DayRange): ISetPostListSelectedDayRangeAction => {
    return {
        type: PostActionTypes.POST_LIST_SET_SELECTED_DAY_RANGE,
        payload: {selectedDayRange}
    }
}

export const setTargetBtn = (targetBtn: string): IPostSetTargetBtnAction => {
    return {
        type: PostActionTypes.POST_SET_TARGET_BTN,
        payload: {targetBtn}
    }
}

export const setPublishBtnTxt = (publishBtnTxt: string): IPostSetPublishBtnTxtAction => {
    return {
        type: PostActionTypes.POST_SET_PUBLISH_BTN_TXT,
        payload: {publishBtnTxt}
    }
}

export const createPostSetUploadAsPublic = (createPostUploadAsPublic: boolean): ICreatePostSetUploadAsPublicAction => {
    return {
        type: PostActionTypes.CREATE_POST_SET_UPLOAD_AS_PUBLIC,
        payload: {createPostUploadAsPublic}
    }
}

export const setPostVisibility = (postVisibility: string): ICreatePostSetPostVisibilityAction => {
    return {
        type: PostActionTypes.CREATE_POST_SET_POST_VISIBILITY,
        payload: {postVisibility}
    }
}

export const setCreatePostAddedFileNumberToUppy = (addedFileNumberToUppy: number) => (dispatch: Dispatch) => {
    if(addedFileNumberToUppy > 0) {
        dispatch<any>(setIsLangBtnDisabled(true));
    } else {
        dispatch<any>(setIsLangBtnDisabled(false));
    }
    dispatch<ICreatePostSetAddedFileNumberToUppyAction>({
        type: PostActionTypes.CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY,
        payload: {
            addedFileNumberToUppy: addedFileNumberToUppy
        }
    })
}