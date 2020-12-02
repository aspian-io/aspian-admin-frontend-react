export interface IFileBrowserAntdTable {
    key: string;
    type: JSX.Element;
    fileName: string;
    publicFileName: string;
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