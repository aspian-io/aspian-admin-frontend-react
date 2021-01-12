import React, {FC, Fragment} from "react";
import {Table} from 'antd';
import {FileBrowserCallerTypeEnum, IFileBrowserAntdTable} from "./types";
import FileBrowserColumns from "./FileBrowserColumns";
import FileBrowserDataSource from "./FileBrowserDataSource";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {connect} from "react-redux";
import {IAttachmentStateType} from "../../../app/store/reducers/attachment/attachmentReducerTypes";
import {
    DirectionActionTypeEnum,
    fileBrowser,
    onOkFileBrowserModal,
    setChosenFile,
    setLastSelectedVideoFileMimeType,
    setTinyMceChosenFile,
    setFeaturedMediaChosenFile
} from "../../../app/store/actions";
import "../../../scss/components/file_browser/_file-browser.scss";

interface IFileBrowserProps {
    attachment: IAttachmentStateType;
    fileBrowserCaller: FileBrowserCallerTypeEnum;
    setChosenFile: typeof setChosenFile;
    onOkFileBrowserModal: typeof onOkFileBrowserModal;
    fileBrowser: Function;
    dir: DirectionActionTypeEnum;
    setLastSelectedVideoFileMimeType: typeof setLastSelectedVideoFileMimeType;
    setTinyMceChosenFile: typeof setTinyMceChosenFile;
    setFeaturedMediaChosenFile: typeof setFeaturedMediaChosenFile;
}

const FileBrowser: FC<IFileBrowserProps> = ({
                                                attachment, setChosenFile,
                                                onOkFileBrowserModal, fileBrowser, dir,
                                                setLastSelectedVideoFileMimeType, fileBrowserCaller,
                                                setTinyMceChosenFile, setFeaturedMediaChosenFile
                                            }) => {
    const {
        fileBrowserLoading,
        fileBrowserDataSource,
        photoFileBrowserDataSource,
        videoFileBrowserDataSource,
        miscellaneousFileBrowserDataSource,
        isFileBrowserActive,
        isMiscellaneousFileBrowserActive,
        isPhotoFileBrowserActive,
        isVideoFileBrowserActive
    } = attachment;

    return (
        <Fragment>
            <Table<IFileBrowserAntdTable> loading={fileBrowserLoading}
                                          size="small"
                                          columns={FileBrowserColumns(dir)}
                                          dataSource={FileBrowserDataSource(
                                              fileBrowserDataSource,
                                              photoFileBrowserDataSource,
                                              videoFileBrowserDataSource,
                                              miscellaneousFileBrowserDataSource,
                                              isFileBrowserActive,
                                              isMiscellaneousFileBrowserActive,
                                              isPhotoFileBrowserActive,
                                              isVideoFileBrowserActive
                                          )}
                                          rowClassName="fileBrowser__table-row"
                                          pagination={{pageSize: 1000, hideOnSinglePage: true}}
                                          scroll={{y: 500}}
            />
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({attachment, locale}: IStoreState):
    {
        attachment: IAttachmentStateType,
        dir: DirectionActionTypeEnum,
        fileBrowserCaller: FileBrowserCallerTypeEnum
    } => {
    return {
        attachment,
        dir: locale.dir,
        fileBrowserCaller: attachment.fileBrowserCaller
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setChosenFile,
    onOkFileBrowserModal,
    fileBrowser,
    setLastSelectedVideoFileMimeType,
    setTinyMceChosenFile,
    setFeaturedMediaChosenFile
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);