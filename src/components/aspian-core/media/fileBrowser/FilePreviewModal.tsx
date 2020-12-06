import React, {FC, Fragment} from "react";
import {Col, Modal, Row} from "antd";
import {connect} from "react-redux";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {setIsFilePreviewModalVisible} from "../../../../app/store/aspian-core/actions";

interface IFilePreviewModalProps {
    isFilePreviewModalVisible: boolean;
    setIsFilePreviewModalVisible: typeof setIsFilePreviewModalVisible;
    isPhotoFileBrowserActive: boolean;
    isVideoFileBrowserActive: boolean;
    lastChosenFileKey: string;
    lastSelectedVideoMimeType: string;
}

const FilePreviewModal: FC<IFilePreviewModalProps> = ({
                                                          isFilePreviewModalVisible,
                                                          setIsFilePreviewModalVisible,
                                                          isVideoFileBrowserActive,
                                                          isPhotoFileBrowserActive,
                                                          lastChosenFileKey,
                                                          lastSelectedVideoMimeType
                                                      }) => {
    return (
        <Fragment>
            <Row>
                <Col xs={24} md={20} lg={18} xl={16} xxl={16}>
                    <Modal
                        visible={isFilePreviewModalVisible}
                        onCancel={() => setIsFilePreviewModalVisible(false)}
                        onOk={() => setIsFilePreviewModalVisible(false)}
                        footer={null}
                        zIndex={100000}
                        centered
                        style={{textAlign: "center"}}
                    >
                        {
                            isPhotoFileBrowserActive && lastChosenFileKey &&
                                <img src={lastChosenFileKey} alt="preview selected image" style={{maxWidth: "100%"}}/>
                        }
                        {
                            isVideoFileBrowserActive && lastSelectedVideoMimeType && lastChosenFileKey &&
                            <video width="320" height="240" controls>
                                <source src={lastChosenFileKey}  type={lastSelectedVideoMimeType} />
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
        lastChosenFileKey: string,
        lastSelectedVideoMimeType: string
    } => {
    return {
        isFilePreviewModalVisible: attachment.isFilePreviewModalVisible,
        isPhotoFileBrowserActive: attachment.isPhotoFileBrowserActive,
        isVideoFileBrowserActive: attachment.isVideoFileBrowserActive,
        lastChosenFileKey: attachment.lastChosenFileKey,
        lastSelectedVideoMimeType: attachment.lastSelectedVideoMimeType
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setIsFilePreviewModalVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePreviewModal);