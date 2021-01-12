import {
    IClearPostInitFormValuesAction,
    IClearSinglePostStateAction,
    ICreatePostAction,
    ICreatePostSetAddedFileNumberToUppyAction,
    ICreatePostSetPostVisibilityAction,
    ICreatePostSetUploadAsPublicAction,
    IDeletePostAction,
    IDeletePostsAction, IEditPostAction,
    IGetPostsAction,
    IGetSinglePostAction,
    ILoadAntdTreeSelectCompatiblePostsAction,
    IPostCreateInitAction,
    IPostLoadingInitialAction,
    IPostSetCurrentPageAction,
    IPostSetPublishBtnTxtAction,
    IPostSetTargetBtnAction,
    IPostSubmittingAction,
    IPostTreeSelectLoadingAction,
    IRemoveAddNewPostTinyMceInstanceAction,
    ISetCategoryTreeSelectChosenValuesAction,
    ISetConfirmedScheduleDateAction,
    ISetConfirmedScheduleDateAndTimeAction,
    ISetConfirmedScheduleTimeAction,
    ISetDateRangeAction,
    ISetDefaultFeaturedMediaAction,
    ISetDeleteRangeBtnAction,
    ISetFeaturedImagesAction,
    ISetFeaturedVideosAction,
    ISetIsCommentAllowedAction,
    ISetIsPendingAction,
    ISetIsPinnedAction,
    ISetJalaliDateAction,
    ISetPostContentAction,
    ISetPostExcerptAction, ISetPostFormLoadingStateAction,
    ISetPostFormValuesAction,
    ISetPostListSelectedDayRangeAction,
    ISetPostListWindowWidthAction,
    ISetPublishScheduledBtnTxtAction,
    ISetSchedulePopoverDateAction,
    ISetSchedulePopoverTimeAction,
    ISetSearchedColumnAction,
    ISetSearchTextAction,
    ISetSelectedRowKeysAction,
    ISetTagsAction,
    PostActionTypes
} from "./postActionTypes";
import {Dispatch} from "redux";
import agent from "../../../api/aspian-core/agent";
import tinymce from "tinymce/tinymce";
import {ReactText} from "react";
import {EventValue} from "rc-picker/lib/interface";
import moment, {Moment} from "moment";
import {DayRange} from "react-modern-calendar-datepicker";
import {setIsLangBtnDisabled} from "../locale/localeActions";
import {IPostSubmitFormValues, PostInitFormValues, PostStatusEnum, PostVisibilityEnum} from "../../../models/post";
import dayjs, {Dayjs} from "dayjs";
import jalaliMoment from "jalali-moment";
import {e2p} from "../../../../js-ts/base/NumberConverter";
import {LanguageActionTypeEnum} from "../locale/localeActionTypes";
import i18n from '../../../../locales/i18n';
import {IFileBrowserAntdTable} from "../../../../components/media/fileBrowser/types";
import {AttachmentTypeEnum} from "../../../models/attachment";
import {TaxonomyTypeEnum} from "../../../models/taxonomy";

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

        return post;
    } catch (error) {
        console.log(error);
        dispatch(setPostLoadingInitial(false));
    }
}

export const postCreateFormInit = (id: string, lang: LanguageActionTypeEnum) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostLoadingInitial(true));
        const post = await agent.Posts.details(id);

        const localDateAndTime = (moment.utc(post.scheduledFor ? post.scheduledFor : post.createdAt).local()).format();

        const jalaliDate = jalaliMoment(localDateAndTime).locale("fa").format("ll");
        const jalaliTime = jalaliMoment(localDateAndTime).locale("fa").format("h:mm:ss a");
        const gregorianDate = moment(localDateAndTime).locale("en").format("ll");
        const gregorianTime = moment(localDateAndTime).locale("en").format("LTS");

        const persianBtnText = `${e2p(jalaliDate)} ${e2p(jalaliTime)}`;
        const englishBtnText = `${gregorianDate} ${gregorianTime}`;

        const confirmedScheduleDateAndTime = post.scheduledFor ? `${moment(post.scheduledFor).format('YYYY-MM-DD')} ${moment(post.scheduledFor).format('HH:mm:ss')}` : '';

        let defaultFeaturedMedia: string = '';
        const featuredImages: IFileBrowserAntdTable[] = [];
        const featuredVideos: IFileBrowserAntdTable[] = [];

        post.postAttachments.forEach((pa) => {
            if (pa.isMain) {
                defaultFeaturedMedia = pa.attachment!.id;
            }

            if (pa.attachment?.type === AttachmentTypeEnum.Photo) {
                featuredImages.push({
                    key: pa.attachment.id,
                    type: pa.attachment.type,
                    mimeType: pa.attachment.mimeType,
                    fileName: pa.attachment.fileName,
                    publicFileName: pa.attachment.publicFileName
                });
            }

            if (pa.attachment?.type === AttachmentTypeEnum.Video) {
                featuredVideos.push({
                    key: pa.attachment.id,
                    type: pa.attachment.type,
                    mimeType: pa.attachment.mimeType,
                    fileName: pa.attachment.fileName,
                    publicFileName: pa.attachment.publicFileName
                });
            }
        });

        const selectedCategories: { value: string, label: string }[] = [];
        const tags: string[] = [];

        post.taxonomyPosts.forEach((tp) => {
            if (tp.taxonomy?.type === TaxonomyTypeEnum.category) {
                selectedCategories.push({
                    value: tp.taxonomy.id!,
                    label: tp.taxonomy.term.name
                });
            }

            if (tp.taxonomy?.type === TaxonomyTypeEnum.tag) {
                tags.push(tp.taxonomy?.term.name);
            }
        });

        const postInitFormValues = new PostInitFormValues({
            id: post.id,
            title: post.title,
            subtitle: post.subtitle,
            excerpt: post.excerpt,
            content: post.content,
            visibility: post.visibility,
            postStatus: post.postStatus,
            publishScheduledBtnTxt: lang === LanguageActionTypeEnum.en ? englishBtnText : persianBtnText,
            schedulePopoverDate: moment(localDateAndTime),
            schedulePopoverTime: moment(localDateAndTime),
            confirmedScheduleDate: moment(localDateAndTime),
            confirmedScheduleTime: moment(localDateAndTime),
            jalaliDate: dayjs(localDateAndTime),
            isScheduled: post.postStatus === PostStatusEnum.Future,
            confirmedScheduleDateAndTime,
            isPinned: post.isPinned,
            isPending: post.postStatus === PostStatusEnum.Pending,
            isCommentAllowed: post.commentAllowed,
            publishBtnTxt: i18n.t('core_postCreate:button.update'),
            featuredImages,
            featuredVideos,
            defaultFeaturedMedia,
            selectedCategories,
            tags,
            editing: true
        });

        dispatch<IPostCreateInitAction>({
            type: PostActionTypes.POST_CREATE_INIT,
            payload: {
                loadingInitial: false,
                postInitFormValues
            }
        })

        return postInitFormValues;
    } catch (error) {
        console.log(error);
        dispatch(setPostLoadingInitial(false));
    }
}

export const clearPostInitFormValues = () => (dispatch: Dispatch) => {
    dispatch(setPostLoadingInitial(true));
    dispatch<IClearPostInitFormValuesAction>({
        type: PostActionTypes.CLEAR_POST_INIT_VALUES,
        payload: {
            loadingInitial: false,
            postInitFormValues: new PostInitFormValues()
        }
    })
}

export const clearPostState = (): IClearSinglePostStateAction => {
    return {
        type: PostActionTypes.CLEAR_SINGLE_POST_STATE,
        payload: {
            post: null
        }
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

export const createPost = (postSubmitFormValues: IPostSubmitFormValues) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostSubmitting(true));
        await agent.Posts.create(postSubmitFormValues);
        dispatch(setPostSubmitting(false));
        dispatch<ICreatePostAction>({
            type: PostActionTypes.CREATE_POST,
            payload: {postSubmitFormValues}
        })
    } catch (err) {
        dispatch<ICreatePostAction>({
            type: PostActionTypes.CREATE_POST,
            payload: {postSubmitFormValues}
        })
        dispatch(setPostSubmitting(false));
        console.error(err);
        throw err;
    }
}

export const editPost = (postSubmitFormValues: IPostSubmitFormValues) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPostSubmitting(true));
        await agent.Posts.update(postSubmitFormValues);
        dispatch(setPostSubmitting(false));
        dispatch<IEditPostAction>({
            type: PostActionTypes.EDIT_POST,
            payload: {postSubmitFormValues}
        })
    } catch (err) {
        dispatch<IEditPostAction>({
            type: PostActionTypes.EDIT_POST,
            payload: {postSubmitFormValues}
        })
        dispatch(setPostSubmitting(false));
        console.error(err);
        throw err;
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

export const setPostVisibility = (postVisibility: PostVisibilityEnum): ICreatePostSetPostVisibilityAction => {
    return {
        type: PostActionTypes.CREATE_POST_SET_POST_VISIBILITY,
        payload: {postVisibility}
    }
}

export const setCreatePostAddedFileNumberToUppy = (addedFileNumberToUppy: number) => (dispatch: Dispatch) => {
    if (addedFileNumberToUppy > 0) {
        dispatch(setIsLangBtnDisabled(true));
    } else {
        dispatch(setIsLangBtnDisabled(false));
    }
    dispatch<ICreatePostSetAddedFileNumberToUppyAction>({
        type: PostActionTypes.CREATE_POST_SET_ADDED_FILE_NUMBER_TO_UPPY,
        payload: {
            addedFileNumberToUppy: addedFileNumberToUppy
        }
    })
}

export const setIsScheduled = (isScheduled: boolean) => {
    return {
        type: PostActionTypes.SET_IS_SCHEDULED,
        payload: {isScheduled}
    }
}

export const setConfirmedScheduleDate = (confirmedScheduleDate: moment.Moment): ISetConfirmedScheduleDateAction => {
    return {
        type: PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE,
        payload: {confirmedScheduleDate}
    }
}

export const setConfirmedScheduleTime = (confirmedScheduleTime: moment.Moment): ISetConfirmedScheduleTimeAction => {
    return {
        type: PostActionTypes.SET_CONFIRMED_SCHEDULE_TIME,
        payload: {confirmedScheduleTime}
    }
}

export const setConfirmedScheduleDateAndTime = (confirmedScheduleDateAndTime: string): ISetConfirmedScheduleDateAndTimeAction => {
    return {
        type: PostActionTypes.SET_CONFIRMED_SCHEDULE_DATE_AND_TIME,
        payload: {confirmedScheduleDateAndTime}
    }
}

export const setPostFormLoadingState = (postFormLoaded: boolean): ISetPostFormLoadingStateAction => {
    return {
        type: PostActionTypes.SET_POST_FORM_LOADING_STATE,
        payload: {postFormLoaded}
    }
}

export const setPostFormValues = (postSubmitFormValues: IPostSubmitFormValues): ISetPostFormValuesAction => {
    return {
        type: PostActionTypes.SET_POST_FORM_VALUES,
        payload: {postSubmitFormValues}
    }
}

export const setIsPinned = (isPinned: boolean): ISetIsPinnedAction => {
    return {
        type: PostActionTypes.SET_IS_PINNED,
        payload: {isPinned}
    }
}

export const setIsPending = (isPending: boolean): ISetIsPendingAction => {
    return {
        type: PostActionTypes.SET_IS_PENDING,
        payload: {isPending}
    }
}

export const setPostExcerpt = (postExcerpt: string): ISetPostExcerptAction => {
    return {
        type: PostActionTypes.SET_POST_EXCERPT,
        payload: {postExcerpt}
    }
}

export const setIsCommentAllowed = (isCommentAllowed: boolean): ISetIsCommentAllowedAction => {
    return {
        type: PostActionTypes.SET_IS_COMMENT_ALLOWED,
        payload: {isCommentAllowed}
    }
}

export const setPublishScheduledBtnTxt = (publishScheduledBtnTxt: string): ISetPublishScheduledBtnTxtAction => {
    return {
        type: PostActionTypes.SET_PUBLISH_SCHEDULED_BTN_TXT,
        payload: {publishScheduledBtnTxt}
    }
}

export const setSchedulePopoverDate = (schedulePopoverDate: moment.Moment): ISetSchedulePopoverDateAction => {
    // Adjusting Jalali date for jalali datepicker value
    // right after changing the popover date value
    const jalaliDateBasedOnPopoverNewDate =
        dayjs(schedulePopoverDate.toString()).calendar('jalali').locale('fa');

    return {
        type: PostActionTypes.SET_SCHEDULE_POPOVER_DATE,
        payload: {
            schedulePopoverDate,
            jalaliDate: jalaliDateBasedOnPopoverNewDate
        }
    }
}

export const setSchedulePopoverTime = (schedulePopoverTime: moment.Moment): ISetSchedulePopoverTimeAction => {
    return {
        type: PostActionTypes.SET_SCHEDULE_POPOVER_TIME,
        payload: {schedulePopoverTime}
    }
}

export const setJalaliDate = (jalaliDate: Dayjs): ISetJalaliDateAction => {
    return {
        type: PostActionTypes.SET_JALALI_DATE,
        payload: {jalaliDate}
    }
}

export const setFeaturedImages = (featuredImages: IFileBrowserAntdTable[]): ISetFeaturedImagesAction => {
    return {
        type: PostActionTypes.SET_FEATURED_IMAGES,
        payload: {featuredImages}
    }
}

export const setFeaturedVideos = (featuredVideos: IFileBrowserAntdTable[]): ISetFeaturedVideosAction => {
    return {
        type: PostActionTypes.SET_FEATURED_VIDEOS,
        payload: {featuredVideos}
    }
}

export const setDefaultFeaturedMedia = (defaultFeaturedMedia: string): ISetDefaultFeaturedMediaAction => {
    return {
        type: PostActionTypes.SET_DEFAULT_FEATURED_MEDIA,
        payload: {defaultFeaturedMedia}
    }
}

export const setCategoryTreeSelectChosenValues = (selectedCategories: { value: string, label: string }[]): ISetCategoryTreeSelectChosenValuesAction => {
    return {
        type: PostActionTypes.SET_CATEGORY_TREE_SELECT_CHOSEN_VALUES,
        payload: {selectedCategories}
    }
}

export const setTags = (tags: string[]): ISetTagsAction => {
    return {
        type: PostActionTypes.SET_TAGS,
        payload: {tags}
    }
}