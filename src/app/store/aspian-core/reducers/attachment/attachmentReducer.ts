import {IAttachmentStateType} from "./attachmentReducerTypes";
import {AttachmentAction, AttachmentActionTypes} from "../../actions";

const initialState: IAttachmentStateType = {
    fileBrowserLoading: false,
    fileBrowserDataSource: [],
    photoFileBrowserDataSource: [],
    videoFileBrowserDataSource: [],
    miscellaneousFileBrowserDataSource: [],
    isFileBrowserActive: false,
    isPhotoFileBrowserActive: false,
    isVideoFileBrowserActive: false,
    isMiscellaneousFileBrowserActive: false,
    isFileBrowserVisible: false,
    lastChosenFileKey: "",
    uploadSettings: null,
    isFilePreviewModalVisible: false,
    lastSelectedVideoMimeType: ''
}

export const attachmentReducer = (state = initialState, action: AttachmentAction) => {
    switch (action.type) {
        case AttachmentActionTypes.FILE_BROWSER_LOADING_INDICATOR:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_FILE_BROWSER_VISIBLE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_PHOTO_FILE_BROWSER_ACTIVE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_VIDEO_FILE_BROWSER_ACTIVE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_MISCELLANEOUS_FILE_BROWSER_ACTIVE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_FILE_BROWSER_ACTIVE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ON_OK_FILE_BROWSER_MODAL:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ON_CANCEL_FILE_BROWSER_MODAL:
            return {...state, ...action.payload};
        case AttachmentActionTypes.FILE_BROWSER_LOADING_PHOTO_FILES:
            return {...state, ...action.payload};
        case AttachmentActionTypes.FILE_BROWSER_LOADING_VIDEO_FILES:
            return {...state, ...action.payload};
        case AttachmentActionTypes.FILE_BROWSER_LOADING_MISCELLANEOUS_FILES:
            return {...state, ...action.payload};
        case AttachmentActionTypes.FILE_BROWSER_LOADING_ALL_FILES:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_CHOSEN_FILE_KEY:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ADD_UPLOADED_FILE_TO_FILES_DATASOURCE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.GET_UPLOAD_SETTINGS:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_IS_FILE_PREVIEW_VISIBLE:
            return {...state, ...action.payload};
        case AttachmentActionTypes.SET_LAST_SELECTED_VIDEO_MIMETYPE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}