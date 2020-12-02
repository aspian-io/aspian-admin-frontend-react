import {IAttachmentUploadSettings, IFileBrowser} from "../../../../models/aspian-core/attachment";

export interface IAttachmentStateType {
    fileBrowserLoading: boolean,
    fileBrowserDataSource: IFileBrowser[];
    photoFileBrowserDataSource: IFileBrowser[];
    videoFileBrowserDataSource: IFileBrowser[];
    miscellaneousFileBrowserDataSource: IFileBrowser[];
    isFileBrowserActive: boolean;
    isPhotoFileBrowserActive: boolean;
    isVideoFileBrowserActive: boolean;
    isMiscellaneousFileBrowserActive: boolean;
    isFileBrowserVisible: boolean;
    lastChosenFileKey: string;
    uploadSettings: IAttachmentUploadSettings | null,
}