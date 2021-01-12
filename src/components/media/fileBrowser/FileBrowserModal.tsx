import React, {FC, Fragment} from "react";
import {Col, Modal, Row} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import FileBrowser from "./FileBrowser";
import {connect} from "react-redux";
import {onCancelFileBrowserModal, onOkFileBrowserModal} from "../../../app/store/actions";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {useTranslation} from "react-i18next";
import FilePreviewModal from "./FilePreviewModal";

interface IFileBrowserModalProps {
    isFileBrowserVisible: boolean;
    onOkFileBrowserModal: typeof onOkFileBrowserModal;
    onCancelFileBrowserModal: typeof onCancelFileBrowserModal;
}

const FileBrowserModal: FC<IFileBrowserModalProps> = ({
                                                          isFileBrowserVisible,
                                                          onOkFileBrowserModal,
                                                          onCancelFileBrowserModal
                                                      }) => {

    const {t} = useTranslation('core_media');

    ///
    return (
        <Fragment>
            <Row>
                <Col xs={24} md={20} lg={18} xl={16} xxl={16}>
                    <Modal
                        title={<Fragment><FolderOpenOutlined/> {t("file-browser.title")}</Fragment>}
                        visible={isFileBrowserVisible}
                        width='100%'
                        onCancel={onCancelFileBrowserModal}
                        onOk={onOkFileBrowserModal}
                        footer={null}
                        zIndex={10000}
                        centered
                    >
                        <FileBrowser/>
                    </Modal>
                </Col>
            </Row>
            <FilePreviewModal />
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({attachment}: IStoreState): { isFileBrowserVisible: boolean } => {
    return {isFileBrowserVisible: attachment.isFileBrowserVisible};
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    onOkFileBrowserModal,
    onCancelFileBrowserModal
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserModal);