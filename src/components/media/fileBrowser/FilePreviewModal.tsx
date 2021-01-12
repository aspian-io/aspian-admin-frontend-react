import React, {FC, Fragment} from "react";
import {Col, Modal, Row} from "antd";
import {connect} from "react-redux";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {setIsFilePreviewModalVisible, clearLastChosenFile} from "../../../app/store/actions";
import {IFileBrowserAntdTable} from "./types";
import agent from "../../../app/api/aspian-core/agent";

interface IFilePreviewModalProps {
    isFilePreviewModalVisible: boolean;
    setIsFilePreviewModalVisible: typeof setIsFilePreviewModalVisible;
    isPhotoFileBrowserActive: boolean;
    isVideoFileBrowserActive: boolean;
    lastChosenFile: IFileBrowserAntdTable | null;
    lastSelectedVideoMimeType: string;
    clearLastChosenFile: typeof clearLastChosenFile;
}

const FilePreviewModal: FC<IFilePreviewModalProps> = ({
                                                          isFilePreviewModalVisible,
                                                          setIsFilePreviewModalVisible,
                                                          isVideoFileBrowserActive,
                                                          isPhotoFileBrowserActive,
                                                          lastChosenFile,
                                                          lastSelectedVideoMimeType,
                                                          clearLastChosenFile
                                                      }) => {
    return (
        <Fragment>
            <Row>
                <Col xs={24} md={20} lg={18} xl={16} xxl={16}>
                    <Modal
                        visible={isFilePreviewModalVisible}
                        onCancel={() => {
                            setIsFilePreviewModalVisible(false);
                            clearLastChosenFile();
                        }}
                        onOk={() => setIsFilePreviewModalVisible(false)}
                        footer={null}
                        zIndex={100000}
                        centered
                        style={{textAlign: "center"}}
                    >
                        {
                            isPhotoFileBrowserActive && lastChosenFile?.fileName &&
                                <img src={agent.Attachments.getFilePrependUrl() + lastChosenFile.fileName} alt="preview selected image" style={{maxWidth: "100%"}}/>
                        }
                        {
                            isVideoFileBrowserActive && lastSelectedVideoMimeType && lastChosenFile?.fileName &&
                            <video width="320" height="240" controls>
                                <source src={agent.Attachments.getFilePrependUrl() + lastChosenFile.fileName}  type={lastSelectedVideoMimeType} />
                                Your browser does not support the video tag.
                            </video>
                        }
                    </Modal>
                </Col>
            </Row>
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({attachment}: IStoreState):
    {
        isFilePreviewModalVisible: boolean,
        isPhotoFileBrowserActive: boolean,
        isVideoFileBrowserActive: boolean,
        lastChosenFile: IFileBrowserAntdTable | null,
        lastSelectedVideoMimeType: string
    } => {
    return {
        isFilePreviewModalVisible: attachment.isFilePreviewModalVisible,
        isPhotoFileBrowserActive: attachment.isPhotoFileBrowserActive,
        isVideoFileBrowserActive: attachment.isVideoFileBrowserActive,
        lastChosenFile: attachment.lastChosenFile,
        lastSelectedVideoMimeType: attachment.lastSelectedVideoMimeType
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setIsFilePreviewModalVisible,
    clearLastChosenFile
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePreviewModal);