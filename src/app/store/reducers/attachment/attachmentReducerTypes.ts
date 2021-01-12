import {IAttachmentUploadSettings, IFileBrowser} from "../../../models/attachment";
import {FileBrowserCallerTypeEnum, IFileBrowserAntdTable} from "../../../../components/media/fileBrowser/types";

export interface IAttachmentStateType {
    readonly fileBrowserLoading: boolean;
    readonly fileBrowserDataSource: IFileBrowser[];
    readonly photoFileBrowserDataSource: IFileBrowser[];
    readonly videoFileBrowserDataSource: IFileBrowser[];
    readonly miscellaneousFileBrowserDataSource: IFileBrowser[];
    readonly isFileBrowserActive: boolean;
    readonly isPhotoFileBrowserActive: boolean;
    readonly isVideoFileBrowserActive: boolean;
    readonly isMiscellaneousFileBrowserActive: boolean;
    readonly isFileBrowserVisible: boolean;
    readonly lastChosenFile: IFileBrowserAntdTable | null;
    readonly uploadSettings: IAttachmentUploadSettings | null;
    readonly lastChosenFileForTinyMce: IFileBrowserAntdTable | null;
    readonly lastChosenFileForFeaturedMedia: IFileBrowserAntdTable | null;
    readonly isFilePreviewModalVisible: boolean;
    readonly lastSelectedVideoMimeType: string;
    readonly fileBrowserCaller: FileBrowserCallerTypeEnum;
}