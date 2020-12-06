import React, {FC, Fragment} from "react";
import {Table} from 'antd';
import {IFileBrowserAntdTable} from "./types";
import FileBrowserColumns from "./FileBrowserColumns";
import FileBrowserDataSource from "./FileBrowserDataSource";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {connect} from "react-redux";
import {IAttachmentStateType} from "../../../../app/store/aspian-core/reducers/attachment/attachmentReducerTypes";
import {
    DirectionActionTypeEnum,
    fileBrowser,
    onOkFileBrowserModal,
    setChosenFileKey,
    setLastSelectedVideoFileMimeType
} from "../../../../app/store/aspian-core/actions";
import "../../../../scss/aspian-core/components/file_browser/_file-browser.scss";

interface IFileBrowserProps {
    attachment: IAttachmentStateType;
    setChosenFileKey: typeof setChosenFileKey;
    onOkFileBrowserModal: typeof onOkFileBrowserModal;
    fileBrowser: Function;
    dir: DirectionActionTypeEnum;
    setLastSelectedVideoFileMimeType: typeof setLastSelectedVideoFileMimeType;
}

const FileBrowser: FC<IFileBrowserProps> = ({
                                                attachment, setChosenFileKey,
                                                onOkFileBrowserModal, fileBrowser, dir,
                                                setLastSelectedVideoFileMimeType
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
                                          columns={FileBrowserColumns(
                                              setChosenFileKey,
                                              onOkFileBrowserModal,
                                              dir, setLastSelectedVideoFileMimeType)}
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
        dir: DirectionActionTypeEnum
    } => {
    return {
        attachment,
        dir: locale.dir
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setChosenFileKey,
    onOkFileBrowserModal,
    fileBrowser,
    setLastSelectedVideoFileMimeType
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);