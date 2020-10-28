export interface IAttachment {
    id: string;
    relativePath: string;
    fileName: string;
    type: string;
    fileSize: number;
    isMain: boolean;
}