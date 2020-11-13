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

export enum UploadLocationEnum {
    LocalHost,
    FtpServer
}

export enum AttachmentTypeEnum {
    Photo,
    Video,
    Audio,
    PDF,
    TextFile,
    Compressed,
    Other
}