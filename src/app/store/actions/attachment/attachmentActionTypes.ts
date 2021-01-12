import {IAttachmentUploadSettings, IFileBrowser} from "../../../models/attachment";
import {FileBrowserCallerTypeEnum, IFileBrowserAntdTable} from "../../../../components/media/fileBrowser/types";

////////////////////////
/// Root Action Type ///
////////////////////////
export type AttachmentAction =
    ISetFileBrowserLoadingIndicatorAction
    | IFileBrowserLoadingAllFilesAction
    | IFileBrowserLoadingPhotoFilesAction
    | IFileBrowserLoadingVideoFilesAction
    | IFileBrowserLoadingMiscellaneousFilesAction
    | ShowFileBrowserModalAction
    | ISetIsFileBrowserVisibleAction
    | ISetIsFileBrowserActiveAction
    | ISetIsPhotoFileBrowserActiveAction
    | ISetIsVideoFileBrowserActiveAction
    | ISetIsMiscellaneousFileBrowserActiveAction
    | IOnOkFileBrowserModalAction
    | IOnCancelFileBrowserModalAction
    | ISetChosenFileAction
    | IClearChosenFileAction
    | IAddUploadedFileToFileBrowserDataSourceAction
    | IAddUploadedFileToPhotoFileBrowserDataSourceAction
    | IAddUploadedFileToVideoFileBrowserDataSourceAction
    | IAddUploadedFileToMiscellaneousFileBrowserDataSourceAction
    | IGetUploadSettingsAction
    | ISetIsFilePreviewVisibleAction
    | ISetLastSelectedVideoMimeTypeAction
    | ISetFileBrowserCallerTypeAction
    | ISetTinyMceChosenFileAction
    | ISetFeaturedMediaChosenFileAction
    | IClearFeaturedMediaChosenFileAction;

/////////////
/// Types ///
/////////////
export enum AttachmentActionTypes {
    FILE_BROWSER_LOADING_INDICATOR = "FILE_BROWSER_LOADING_INDICATOR",
    FILE_BROWSER_LOADING_ALL_FILES = "FILE_BROWSER_LOADING_ALL_FILES",
    FILE_BROWSER_LOADING_PHOTO_FILES = "FILE_BROWSER_LOADING_PHOTO_FILES",
    FILE_BROWSER_LOADING_VIDEO_FILES = "FILE_BROWSER_LOADING_VIDEO_FILES",
    FILE_BROWSER_LOADING_MISCELLANEOUS_FILES = "FILE_BROWSER_LOADING_MISCELLANEOUS_FILES",
    SET_IS_FILE_BROWSER_VISIBLE = "SET_IS_FILE_BROWSER_VISIBLE",
    SET_IS_FILE_BROWSER_ACTIVE = "SET_IS_FILE_BROWSER_ACTIVE",
    SET_IS_PHOTO_FILE_BROWSER_ACTIVE = "SET_IS_PHOTO_FILE_BROWSER_ACTIVE",
    SET_IS_VIDEO_FILE_BROWSER_ACTIVE = "SET_IS_VIDEO_FILE_BROWSER_ACTIVE",
    SET_IS_MISCELLANEOUS_FILE_BROWSER_ACTIVE = "SET_IS_MISCELLANEOUS_FILE_BROWSER_ACTIVE",
    ON_OK_FILE_BROWSER_MODAL = "ON_OK_FILE_BROWSER_MODAL",
    ON_CANCEL_FILE_BROWSER_MODAL = "ON_CANCEL_FILE_BROWSER_MODAL",
    SET_CHOSEN_FILE = "SET_CHOSEN_FILE",
    SET_TINYMCE_CHOSEN_FILE = "SET_TINYMCE_CHOSEN_FILE",
    SET_FEATURED_MEDIA_CHOSEN_FILE = "SET_FEATURED_MEDIA_CHOSEN_FILE",
    CLEAR_CHOSEN_FILE = "CLEAR_CHOSEN_FILE",
    CLEAR_FEATURED_MEDIA_CHOSEN_FILE = "CLEAR_FEATURED_MEDIA_CHOSEN_FILE",
    SET_IS_FILE_PREVIEW_VISIBLE = "SET_IS_FILE_PREVIEW_VISIBLE",
    ADD_UPLOADED_FILE_TO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE",
    GET_UPLOAD_SETTINGS = "GET_UPLOAD_SETTINGS",
    SET_LAST_SELECTED_VIDEO_MIMETYPE = "SET_LAST_SELECTED_VIDEO_MIMETYPE",
    SET_FILE_BROWSER_CALLER_TYPE = "SET_FILE_BROWSER_CALLER_TYPE"
}

////////////////////
/// Action Types ///
////////////////////
export interface ISetFileBrowserLoadingIndicatorAction {
    type: AttachmentActionTypes.FILE_BROWSER_LOADING_INDICATOR,
    payload: {
        fileBrowserLoading: boolean
    };
}

export interface IFileBrowserLoadingAllFilesAction {
    type: AttachmentActionTypes.FILE_BROWSER_LOADING_ALL_FILES,
    payload: {
        fileBrowserDataSource: IFileBrowser[],
        fileBrowserLoading: boolean
    };
}

export interface IFileBrowserLoadingPhotoFilesAction {
    type: AttachmentActionTypes.FILE_BROWSER_LOADING_PHOTO_FILES,
    payload: {
        photoFileBrowserDataSource: IFileBrowser[],
        fileBrowserLoading: boolean
    };
}

export interface IFileBrowserLoadingVideoFilesAction {
    type: AttachmentActionTypes.FILE_BROWSER_LOADING_VIDEO_FILES,
    payload: {
        videoFileBrowserDataSource: IFileBrowser[],
        fileBrowserLoading: boolean
    };
}

export interface IFileBrowserLoadingMiscellaneousFilesAction {
    type: AttachmentActionTypes.FILE_BROWSER_LOADING_MISCELLANEOUS_FILES,
    payload: {
        miscellaneousFileBrowserDataSource: IFileBrowser[],
        fileBrowserLoading: boolean
    };
}

export type ShowFileBrowserModalAction =
    ISetIsFileBrowserVisibleAction
    | ISetIsFileBrowserActiveAction
    | ISetIsPhotoFileBrowserActiveAction
    | ISetIsVideoFileBrowserActiveAction
    | ISetIsMiscellaneousFileBrowserActiveAction
    | IClearChosenFileAction
    | ISetFileBrowserCallerTypeAction;

export interface ISetIsFileBrowserVisibleAction {
    type: AttachmentActionTypes.SET_IS_FILE_BROWSER_VISIBLE,
    payload: {
        isFileBrowserVisible: boolean
    }
}

export interface ISetIsFileBrowserActiveAction {
    type: AttachmentActionTypes.SET_IS_FILE_BROWSER_ACTIVE,
    payload: {
        isFileBrowserActive: boolean
    }
}

export interface ISetIsPhotoFileBrowserActiveAction {
    type: AttachmentActionTypes.SET_IS_PHOTO_FILE_BROWSER_ACTIVE,
    payload: {
        isPhotoFileBrowserActive: boolean
    }
}

export interface ISetIsVideoFileBrowserActiveAction {
    type: AttachmentActionTypes.SET_IS_VIDEO_FILE_BROWSER_ACTIVE,
    payload: {
        isVideoFileBrowserActive: boolean
    }
}

export interface ISetIsMiscellaneousFileBrowserActiveAction {
    type: AttachmentActionTypes.SET_IS_MISCELLANEOUS_FILE_BROWSER_ACTIVE,
    payload: {
        isMiscellaneousFileBrowserActive: boolean
    }
}

export interface IOnOkFileBrowserModalAction {
    type: AttachmentActionTypes.ON_OK_FILE_BROWSER_MODAL,
    payload: {
        isFileBrowserVisible: boolean,
        isFileBrowserActive: boolean,
        isPhotoFileBrowserActive: boolean,
        isVideoFileBrowserActive: boolean,
        isMiscellaneousFileBrowserActive: boolean
    }
}

export interface IOnCancelFileBrowserModalAction {
    type: AttachmentActionTypes.ON_CANCEL_FILE_BROWSER_MODAL,
    payload: {
        isFileBrowserVisible: boolean,
        isFileBrowserActive: boolean,
        isPhotoFileBrowserActive: boolean,
        isVideoFileBrowserActive: boolean,
        isMiscellaneousFileBrowserActive: boolean
    }
}

export interface ISetChosenFileAction {
    type: AttachmentActionTypes.SET_CHOSEN_FILE,
    payload: {
        lastChosenFile: IFileBrowserAntdTable
    }
}

export interface IClearChosenFileAction {
    type: AttachmentActionTypes.CLEAR_CHOSEN_FILE,
    payload: {
        lastChosenFile: null
    }
}

export interface ISetTinyMceChosenFileAction {
    type: AttachmentActionTypes.SET_TINYMCE_CHOSEN_FILE,
    payload: {
        lastChosenFileForTinyMce: IFileBrowserAntdTable | null
    }
}

export interface ISetFeaturedMediaChosenFileAction {
    type: AttachmentActionTypes.SET_FEATURED_MEDIA_CHOSEN_FILE,
    payload: {
        lastChosenFileForFeaturedMedia: IFileBrowserAntdTable | null
    }
}

export interface IClearFeaturedMediaChosenFileAction {
    type: AttachmentActionTypes.CLEAR_FEATURED_MEDIA_CHOSEN_FILE,
    payload: {
        lastChosenFileForFeaturedMedia: null
    }
}

export interface IAddUploadedFileToFileBrowserDataSourceAction {
    type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_FILES_DATASOURCE,
    payload: {
        fileBrowserDataSource: IFileBrowser[]
    }
}

export interface IAddUploadedFileToPhotoFileBrowserDataSourceAction {
    type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE,
    payload: {
        photoFileBrowserDataSource: IFileBrowser[]
    }
}

export interface IAddUploadedFileToVideoFileBrowserDataSourceAction {
    type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE,
    payload: {
        videoFileBrowserDataSource: IFileBrowser[]
    }
}

export interface IAddUploadedFileToMiscellaneousFileBrowserDataSourceAction {
    type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE,
    payload: {
        miscellaneousFileBrowserDataSource: IFileBrowser[]
    }
}

export interface IGetUploadSettingsAction {
    type: AttachmentActionTypes.GET_UPLOAD_SETTINGS,
    payload: {
        uploadSettings: IAttachmentUploadSettings
    }
}

export interface ISetIsFilePreviewVisibleAction {
    type: AttachmentActionTypes.SET_IS_FILE_PREVIEW_VISIBLE,
    payload: {
        isFilePreviewModalVisible: boolean
    }
}

export interface ISetLastSelectedVideoMimeTypeAction {
    type: AttachmentActionTypes.SET_LAST_SELECTED_VIDEO_MIMETYPE,
    payload: {
        lastSelectedVideoMimeType: string
    }
}

export interface ISetFileBrowserCallerTypeAction {
    type: AttachmentActionTypes.SET_FILE_BROWSER_CALLER_TYPE,
    payload: {
        fileBrowserCaller: FileBrowserCallerTypeEnum
    }
}