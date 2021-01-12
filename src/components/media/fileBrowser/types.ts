import {AttachmentTypeEnum} from "../../../app/models/attachment";

export interface IFileBrowserAntdTable {
    key: string;
    mimeType: string;
    fileName: string;
    publicFileName: string;
    type: AttachmentTypeEnum;
}

export enum FileBrowserColumnDataIndexEnum {
    TYPE = "type",
    PUBLIC_FILE_NAME = "publicFileName",
    ACTIONS = "actions"
}

export enum FileBrowserModalTypeEnum {
    FILE_BROWSER = "FILE_BROWSER",
    PHOTO_FILE_BROWSER = "PHOTO_FILE_BROWSER",
    VIDEO_FILE_BROWSER = "VIDEO_FILE_BROWSER",
    MISCELLANEOUS_FILE_BROWSER = "MISCELLANEOUS_FILE_BROWSER"
}

export enum FileBrowserCallerTypeEnum {
    UNDEFINED = "UNDEFINED",
    POST_CREATE_TINYMCE = "POST_CREATE_TINYMCE",
    POST_CREATE_FEATURED_MEDIA = "POST_CREATE_FEATURED_MEDIA",
}