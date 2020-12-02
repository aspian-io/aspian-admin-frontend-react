export interface IAttachment {
    id: string;
    relativePath: string;
    fileName: string;
    type: string;
    fileSize: number;
    isMain: boolean;
}

export interface IFileBrowser {
    id: string;
    relativePath: string;
    fileName: string;
    publicFileName: string;
    fileExtension: string;
    type: AttachmentTypeEnum;
    uploadLocation: UploadLocationEnum;
    fileSize: number;
    createdAt: Date;
}

export interface IAttachmentUploadSettings {
    isMultipleUploadAllowed: boolean;
    isAutoProceedUploadAllowed: boolean;
    uploadMaxAllowedNumberOfFiles: number;
    uploadMinAllowedNumberOfFiles: number;
    uploadMaxAllowedFileSize: number;
    uploadAllowedFileTypes: string[];
}

export enum UploadLocationEnum {
    LocalHost,
    FtpServer
}

export enum AttachmentTypeEnum {
    Photo = 0,
    Video = 1,
    Audio = 2,
    PDF = 3,
    TextFile = 4,
    Compressed = 5,
    Other = 6
}