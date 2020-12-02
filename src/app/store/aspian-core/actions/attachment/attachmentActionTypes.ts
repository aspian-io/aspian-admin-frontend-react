import {IAttachmentUploadSettings, IFileBrowser} from "../../../../models/aspian-core/attachment";

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
    | ISetChosenFileKeyAction
    | IAddUploadedFileToFileBrowserDataSourceAction
    | IAddUploadedFileToPhotoFileBrowserDataSourceAction
    | IAddUploadedFileToVideoFileBrowserDataSourceAction
    | IAddUploadedFileToMiscellaneousFileBrowserDataSourceAction
    | IGetUploadSettingsAction;

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
    SET_CHOSEN_FILE_KEY = "SET_CHOSEN_FILE_KEY",
    ADD_UPLOADED_FILE_TO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE",
    ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE = "ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE",
    GET_UPLOAD_SETTINGS = "GET_UPLOAD_SETTINGS",
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
    | ISetIsMiscellaneousFileBrowserActiveAction;

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

export interface ISetChosenFileKeyAction {
    type: AttachmentActionTypes.SET_CHOSEN_FILE_KEY,
    payload: {
        lastChosenFileKey: string
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
