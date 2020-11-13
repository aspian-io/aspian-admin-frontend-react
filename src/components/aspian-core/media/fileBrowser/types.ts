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