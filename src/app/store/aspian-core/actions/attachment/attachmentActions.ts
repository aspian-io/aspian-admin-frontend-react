import {AttachmentTypeEnum, IFileBrowser} from "../../../../models/aspian-core/attachment";
import {Dispatch} from "redux";
import {
    AttachmentActionTypes,
    IAddUploadedFileToFileBrowserDataSourceAction,
    IAddUploadedFileToMiscellaneousFileBrowserDataSourceAction,
    IAddUploadedFileToPhotoFileBrowserDataSourceAction,
    IAddUploadedFileToVideoFileBrowserDataSourceAction,
    IFileBrowserLoadingAllFilesAction,
    IFileBrowserLoadingMiscellaneousFilesAction,
    IFileBrowserLoadingPhotoFilesAction,
    IFileBrowserLoadingVideoFilesAction,
    IGetUploadSettingsAction,
    IOnCancelFileBrowserModalAction,
    IOnOkFileBrowserModalAction,
    ISetChosenFileKeyAction,
    ISetFileBrowserLoadingIndicatorAction,
    ISetIsFileBrowserVisibleAction,
    ShowFileBrowserModalAction
} from "./attachmentActionTypes";
import agent from "../../../../api/aspian-core/agent";
import {FileBrowserModalTypeEnum} from "../../../../../components/aspian-core/media/fileBrowser/types";


export const setFileBrowserLoading = (fileBrowserLoading: boolean): ISetFileBrowserLoadingIndicatorAction => {
    return {
        type: AttachmentActionTypes.FILE_BROWSER_LOADING_INDICATOR,
        payload: {fileBrowserLoading}
    }
}

export const fileBrowser = (type: AttachmentTypeEnum | "" = "") => async (dispatch: Dispatch) => {
    try {
        dispatch(setFileBrowserLoading(true));
        const files = await agent.Attachments.fileBrowser(type);
        if (type === "") {
            dispatch<IFileBrowserLoadingAllFilesAction>({
                type: AttachmentActionTypes.FILE_BROWSER_LOADING_ALL_FILES,
                payload: {
                    fileBrowserDataSource: files,
                    fileBrowserLoading: false
                }
            })
        }
        if (type === AttachmentTypeEnum.Photo) {
            dispatch<IFileBrowserLoadingPhotoFilesAction>({
                type: AttachmentActionTypes.FILE_BROWSER_LOADING_PHOTO_FILES,
                payload: {
                    photoFileBrowserDataSource: files,
                    fileBrowserLoading: false
                }
            })
        }
        if (type === AttachmentTypeEnum.Video) {
            dispatch<IFileBrowserLoadingVideoFilesAction>({
                type: AttachmentActionTypes.FILE_BROWSER_LOADING_VIDEO_FILES,
                payload: {
                    videoFileBrowserDataSource: files,
                    fileBrowserLoading: false
                }
            })
        }
        if (type === AttachmentTypeEnum.Other) {
            dispatch<IFileBrowserLoadingMiscellaneousFilesAction>({
                type: AttachmentActionTypes.FILE_BROWSER_LOADING_MISCELLANEOUS_FILES,
                payload: {
                    miscellaneousFileBrowserDataSource: files,
                    fileBrowserLoading: false
                }
            })
        }
    } catch (error) {
        console.log(error);
        dispatch(setFileBrowserLoading(false));
        throw error;
    }
}

export const setIsFileBrowserVisible = (isFileBrowserVisible: boolean): ISetIsFileBrowserVisibleAction => {
    return {
        type: AttachmentActionTypes.SET_IS_FILE_BROWSER_VISIBLE,
        payload: {isFileBrowserVisible}
    }
}

// Show File Browser's Modal
export const showFileBrowserModal = (modalType: FileBrowserModalTypeEnum) => (dispatch: Dispatch<ShowFileBrowserModalAction>) => {
    dispatch(setIsFileBrowserVisible(true));
    if (modalType === FileBrowserModalTypeEnum.FILE_BROWSER) {
        dispatch({
            type: AttachmentActionTypes.SET_IS_FILE_BROWSER_ACTIVE,
            payload: {isFileBrowserActive: true}
        })
    }
    if (modalType === FileBrowserModalTypeEnum.PHOTO_FILE_BROWSER) {
        dispatch({
            type: AttachmentActionTypes.SET_IS_PHOTO_FILE_BROWSER_ACTIVE,
            payload: {isPhotoFileBrowserActive: true}
        })
    }
    if (modalType === FileBrowserModalTypeEnum.VIDEO_FILE_BROWSER) {
        dispatch({
            type: AttachmentActionTypes.SET_IS_VIDEO_FILE_BROWSER_ACTIVE,
            payload: {isVideoFileBrowserActive: true}
        })
    }
    if (modalType === FileBrowserModalTypeEnum.MISCELLANEOUS_FILE_BROWSER) {
        dispatch({
            type: AttachmentActionTypes.SET_IS_MISCELLANEOUS_FILE_BROWSER_ACTIVE,
            payload: {isMiscellaneousFileBrowserActive: true}
        })
    }
}

export const onOkFileBrowserModal = (): IOnOkFileBrowserModalAction => {
    return {
        type: AttachmentActionTypes.ON_OK_FILE_BROWSER_MODAL,
        payload: {
            isFileBrowserVisible: false,
            isFileBrowserActive: false,
            isPhotoFileBrowserActive: false,
            isVideoFileBrowserActive: false,
            isMiscellaneousFileBrowserActive: false
        }
    }
}

export const onCancelFileBrowserModal = (): IOnCancelFileBrowserModalAction => {
    return {
        type: AttachmentActionTypes.ON_CANCEL_FILE_BROWSER_MODAL,
        payload: {
            isFileBrowserVisible: false,
            isFileBrowserActive: false,
            isPhotoFileBrowserActive: false,
            isVideoFileBrowserActive: false,
            isMiscellaneousFileBrowserActive: false
        }
    }
}

export const setChosenFileKey = (key: string): ISetChosenFileKeyAction => {
    return {
        type: AttachmentActionTypes.SET_CHOSEN_FILE_KEY,
        payload: {
            lastChosenFileKey: key
        }
    }
}

export const addNewUploadedFileToFileBrowser = (fileName: string, photoFileBrowserDataSource: IFileBrowser[],
                                                videoFileBrowserDataSource: IFileBrowser[],
                                                miscellaneousFileBrowserDataSource: IFileBrowser[],
                                                fileBrowserDataSource: IFileBrowser[]
) => async (dispatch: Dispatch) => {
    try {
        const uploadedFile = await agent.Attachments.fileBrowserFileDetails(fileName);

        if (uploadedFile?.type === AttachmentTypeEnum.Photo) {
            if (photoFileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToPhotoFileBrowser(uploadedFile, photoFileBrowserDataSource));
            }
            if (fileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToFileBrowser(uploadedFile, fileBrowserDataSource));
            }
        }
        if (uploadedFile?.type === AttachmentTypeEnum.Video) {
            if (videoFileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToVideoFileBrowser(uploadedFile, videoFileBrowserDataSource));
            }
            if (fileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToFileBrowser(uploadedFile, fileBrowserDataSource));
            }
        }
        if (uploadedFile?.type !== AttachmentTypeEnum.Photo && uploadedFile?.type !== AttachmentTypeEnum.Video) {
            if (miscellaneousFileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToMiscellaneousFileBrowser(uploadedFile!, miscellaneousFileBrowserDataSource));
            }
            if (fileBrowserDataSource.length > 0) {
                dispatch(addUploadedFileToFileBrowser(uploadedFile!, fileBrowserDataSource));
            }
        }

    } catch (error) {
        console.log(error);
    }
}

export const addUploadedFileToFileBrowser = (uploadedFile: IFileBrowser, fileBrowserDataSource: IFileBrowser[])
    : IAddUploadedFileToFileBrowserDataSourceAction => {

    let updatedDataSource: IFileBrowser[] = Object.assign([], fileBrowserDataSource);
    updatedDataSource.push(uploadedFile);

    return {
        type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_FILES_DATASOURCE,
        payload: {
            fileBrowserDataSource: updatedDataSource
        }
    }
}

export const addUploadedFileToPhotoFileBrowser = (uploadedFile: IFileBrowser, photoFileBrowserDataSource: IFileBrowser[])
    : IAddUploadedFileToPhotoFileBrowserDataSourceAction => {

    let updatedDataSource: IFileBrowser[] = Object.assign([], photoFileBrowserDataSource);
    updatedDataSource.push(uploadedFile);

    return {
        type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_PHOTO_FILES_DATASOURCE,
        payload: {
            photoFileBrowserDataSource: updatedDataSource
        }
    }
}

export const addUploadedFileToVideoFileBrowser = (uploadedFile: IFileBrowser, videoFileBrowserDataSource: IFileBrowser[])
    : IAddUploadedFileToVideoFileBrowserDataSourceAction => {

    let updatedDataSource: IFileBrowser[] = Object.assign([], videoFileBrowserDataSource);
    updatedDataSource.push(uploadedFile);

    return {
        type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_VIDEO_FILES_DATASOURCE,
        payload: {
            videoFileBrowserDataSource: updatedDataSource
        }
    }
}

export const addUploadedFileToMiscellaneousFileBrowser = (uploadedFile: IFileBrowser, miscellaneousFileBrowserDataSource: IFileBrowser[])
    : IAddUploadedFileToMiscellaneousFileBrowserDataSourceAction => {

    let updatedDataSource: IFileBrowser[] = Object.assign([], miscellaneousFileBrowserDataSource);
    updatedDataSource.push(uploadedFile);

    return {
        type: AttachmentActionTypes.ADD_UPLOADED_FILE_TO_MISCELLANEOUS_FILES_DATASOURCE,
        payload: {
            miscellaneousFileBrowserDataSource: updatedDataSource
        }
    }
}

export const getUploadSettings = () => async (dispatch: Dispatch) => {
    try {
        const uploadSettings = await agent.Attachments.uploadSettings();
        dispatch<IGetUploadSettingsAction>({
            type: AttachmentActionTypes.GET_UPLOAD_SETTINGS,
            payload: {uploadSettings}
        })
    } catch (error) {
        console.log("Error getting upload settings.");
    }
}