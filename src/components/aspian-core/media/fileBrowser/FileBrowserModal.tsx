import React, {FC, Fragment, useContext} from "react";
import {Modal} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import FileBrowser from "./FileBrowser";
import {connect} from "react-redux";
import {onCancelFileBrowserModal, onOkFileBrowserModal} from "../../../../app/store/aspian-core/actions";
import {IStoreState} from "../../../../app/store/rootReducerTypes";

interface IFileBrowserModalProps {
    isFileBrowserVisible: boolean;
    onOkFileBrowserModal: typeof onOkFileBrowserModal;
    onCancelFileBrowserModal: typeof onCancelFileBrowserModal;
}

const FileBrowserModal: FC<IFileBrowserModalProps> = ({isFileBrowserVisible, onOkFileBrowserModal, onCancelFileBrowserModal}) => {

    ///
    return (
        <Fragment>
            {/*{addedFileKeysFromFileBrowser.length > 0 &&*/}
            {/*<Card title={<Typography.Text>Added From File Browser</Typography.Text>} size="small" bordered={false}>*/}
            {/*    <List*/}
            {/*        style={{fontSize: "12px"}}*/}
            {/*        itemLayout="horizontal"*/}
            {/*        size="small"*/}
            {/*        dataSource={addedFileKeysFromFileBrowser.map((fk, i) => fileBrowserRegistry.get(fk))}*/}
            {/*        renderItem={file => (*/}
            {/*            <List.Item>*/}
            {/*                <List.Item.Meta*/}
            {/*                    avatar={GetFileTypeIcon(file!.type)}*/}
            {/*                    title={*/}
            {/*                        <Fragment>*/}
            {/*                            <Row>*/}
            {/*                                <Col span={20}>*/}
            {/*                                    <a href="https://ant.design"*/}
            {/*                                       style={{fontSize: "11px"}}>{file!.publicFileName}</a>*/}
            {/*                                </Col>*/}
            {/*                                <Col span={4}>*/}
            {/*                                    <Switch*/}
            {/*                                        style={{margin: "0 5px"}}*/}
            {/*                                        checked={addedFileKeysFromFileBrowser.includes(file!.id)}*/}
            {/*                                        checkedChildren={<CheckOutlined/>}*/}
            {/*                                        unCheckedChildren={<CloseOutlined/>}*/}
            {/*                                        size="small"*/}
            {/*                                        onClick={(checked) => {*/}
            {/*                                            if (checked) {*/}
            {/*                                                fileBrowserAddFileKey(file!.id);*/}
            {/*                                            } else {*/}
            {/*                                                removeAddedFileKeyFromArray(file!.id);*/}
            {/*                                            }*/}
            {/*                                        }}*/}

            {/*                                    />*/}
            {/*                                </Col>*/}
            {/*                            </Row>*/}
            {/*                        </Fragment>*/}
            {/*                    }*/}
            {/*                    description={<Text type="secondary"*/}
            {/*                                       style={{fontSize: "10px"}}>{GetRoundedFileSize(file!.fileSize, lang)}</Text>}*/}
            {/*                />*/}
            {/*            </List.Item>*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</Card>}*/}
            {/*<Button type="primary" icon={<FolderOpenOutlined/>} block style={{marginBottom: "10px"}}*/}
            {/*        onClick={showFileBrowserModal}>File Browser</Button>*/}
            <Modal
                title={<Fragment><FolderOpenOutlined/> File Browser</Fragment>}
                visible={isFileBrowserVisible}
                width={500}
                onCancel={onCancelFileBrowserModal}
                onOk={onOkFileBrowserModal}
                footer={null}
                zIndex={10000}
                centered
            >
                <FileBrowser/>
            </Modal>
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