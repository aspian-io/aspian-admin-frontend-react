import React, {FC, Fragment, useEffect} from "react";
import {Table} from 'antd';
import {IFileBrowserAntdTable} from "./types";
import FileBrowserColumns from "./FileBrowserColumns";
import FileBrowserDataSource from "./FileBrowserDataSource";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {connect} from "react-redux";
import {IAttachmentStateType} from "../../../../app/store/aspian-core/reducers/attachment/attachmentReducerTypes";
import {fileBrowser, onOkFileBrowserModal, setChosenFileKey} from "../../../../app/store/aspian-core/actions";
import {AttachmentTypeEnum} from "../../../../app/models/aspian-core/attachment";

interface IFileBrowserProps {
    attachment: IAttachmentStateType;
    setChosenFileKey: typeof setChosenFileKey;
    onOkFileBrowserModal: typeof onOkFileBrowserModal;
    fileBrowser: Function;
}

const FileBrowser: FC<IFileBrowserProps> = ({attachment, setChosenFileKey, onOkFileBrowserModal, fileBrowser}) => {
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

    ///
    // useEffect(() => {
    //     if (isFileBrowserActive && fileBrowserDataSource.length === 0) {
    //         fileBrowser();
    //     }
    //     if (isPhotoFileBrowserActive && photoFileBrowserDataSource.length === 0) {
    //         fileBrowser(AttachmentTypeEnum.Photo);
    //     }
    //     if (isVideoFileBrowserActive && videoFileBrowserDataSource.length === 0) {
    //         fileBrowser(AttachmentTypeEnum.Video);
    //     }
    //     if (isMiscellaneousFileBrowserActive && miscellaneousFileBrowserDataSource.length === 0) {
    //         fileBrowser(AttachmentTypeEnum.Other);
    //     }
    // }, [isFileBrowserActive, isPhotoFileBrowserActive,
    //     isVideoFileBrowserActive, isMiscellaneousFileBrowserActive,
    //     fileBrowserDataSource.length, photoFileBrowserDataSource.length,
    //     videoFileBrowserDataSource.length, miscellaneousFileBrowserDataSource.length, fileBrowser])

    return (
        <Fragment>
            <Table<IFileBrowserAntdTable> loading={fileBrowserLoading}
                                          size="small"
                                          columns={FileBrowserColumns(setChosenFileKey, onOkFileBrowserModal)}
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
const mapStateToProps = ({attachment}: IStoreState): { attachment: IAttachmentStateType } => {
    return {attachment}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setChosenFileKey,
    onOkFileBrowserModal,
    fileBrowser
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);