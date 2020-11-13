import React, {Fragment, useContext, useState} from "react";
import {observer} from "mobx-react-lite";

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '../../../../scss/aspian-core/components/uppy/_uppy-custom.scss';
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {LanguageActionTypeEnum} from "../../../../app/stores/aspian-core/locale/types";
import English from "@uppy/locales/lib/en_US";
import Persian from "@uppy/locales/lib/fa_IR";
import {Button, Col, List, Modal, Row, Spin, Switch} from "antd";
import {CheckOutlined, CloseOutlined, FolderOpenOutlined} from '@ant-design/icons';
import FileBrowser from "../../media/fileBrowser/FileBrowser";
import Text from "antd/es/typography/Text";
import {GetFileTypeIcon} from "../../media/utils/GetFileTypeIcon";
import {GetRoundedFileSize} from "../../../../js-ts/aspian-core/base/FileSize";


const Attachments = () => {
    //const {t} = useTranslation('core_postCreate');
    const coreRootStore = useContext(CoreRootStoreContext);
    const {lang} = coreRootStore.localeStore;
    const {
        deleteUploadedTusFile, deleting,
        addedFileKeysFromFileBrowser, fileBrowserRegistry,
        fileBrowserAddFileKey, removeAddedFileKeyFromArray
    } = coreRootStore.attachmentStore;
    // Visibility state of Gallery's Modal
    const [isGalleryModalVisible, setIsGalleryModalVisible] = useState(false);


    const uppy = Uppy({
        locale: lang === LanguageActionTypeEnum.fa ? Persian : English,
        autoProceed: true,
        allowMultipleUploads: true,

        // restrictions: {
        //     maxFileSize: 1000000,
        //     maxNumberOfFiles: 3,
        //     minNumberOfFiles: 2,
        //     allowedFileTypes: ['image/*', 'video/*']
        // }
    })

    //const [myUppyState, setMyUppyState] = useState<Uppy.State<{}, {}>>(uppy.getState());

    uppy.use(Tus, {
        endpoint: 'http://localhost:5001/api/v1/attachments/add-private-media',
        onBeforeRequest: (req) => {
            const xhr = req.getUnderlyingObject()
            xhr.withCredentials = true
        }
    })

    uppy.on('upload-success', (file, response) => {
        const uploadURL = response.uploadURL;
        const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);
        //uppy.removeFile(file.id);
        const tusFileIdsHiddenInput = document.createElement("input");
        tusFileIdsHiddenInput.setAttribute("type", "hidden");
        tusFileIdsHiddenInput.setAttribute("name", "addNewPostMediaId[]");
        tusFileIdsHiddenInput.setAttribute("value", tusFileId);

        const addNewPostForm = document.getElementById("addNewPostForm");
        addNewPostForm?.appendChild(tusFileIdsHiddenInput);

        //setMyUppyState(uppy.getState());
        //console.log("my state: ", myUppyState);
    })

    // uppy.on('complete', (result) => {
    //     setMyUppyState(uppy.getState());
    // })

    // uppy.on('thumbnail:generated', (file, preview) => {
    //     setMyUppyState(uppy.getState());
    // })

    //
    //uppy.setState(myUppyState);

// uppy.on('complete', (result) => {
//     const url = result.successful[0].uploadURL
//     store.dispatch({
//         type: 'SET_USER_AVATAR_URL',
//         payload: { url: url }
//     })
// })


    uppy.on('file-removed', async (file, reason) => {
        //console.log("state from remove: ", myUppyState);
        //const stateObj = Object.assign({}, myUppyState);


        // delete stateObj.files[file.id];
        // stateObj.currentUploads = {};

        //setMyUppyState(stateObj);
        //uppy.setState(myUppyState);

        if (reason === 'removed-by-user') {
            const uploadURL = file.response.uploadURL;
            const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);

            await deleteUploadedTusFile(tusFileId);
        }
    })

    // Show Gallery's Modal
    const showModal = () => {
        setIsGalleryModalVisible(true);
    }

    // onOk Gallery's Modal event
    const onOkGalleryModal = () => {
        setIsGalleryModalVisible(false);
    }

    // onCancel Gallery's Modal event
    const onCancelGalleryModal = () => {
        setIsGalleryModalVisible(false);
    }

    return (
        <Fragment>
            {addedFileKeysFromFileBrowser.length > 0 &&
            <List
                style={{fontSize: "12px"}}
                header={<div>Files Added From Server</div>}
                itemLayout="horizontal"
                size="small"
                dataSource={addedFileKeysFromFileBrowser.map((fk, i) => fileBrowserRegistry.get(fk))}
                renderItem={file => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={GetFileTypeIcon(file!.type)}
                            title={
                                <Fragment>
                                    <Row>
                                        <Col span={20}>
                                            <a href="https://ant.design"
                                               style={{fontSize: "11px"}}>{file!.publicFileName}</a>
                                        </Col>
                                        <Col span={4}>
                                            <Switch
                                                style={{margin: "0 5px"}}
                                                checked={addedFileKeysFromFileBrowser.includes(file!.id)}
                                                checkedChildren={<CheckOutlined/>}
                                                unCheckedChildren={<CloseOutlined/>}
                                                size="small"
                                                onClick={(checked) => {
                                                    if (checked) {
                                                        fileBrowserAddFileKey(file!.id);
                                                    } else {
                                                        removeAddedFileKeyFromArray(file!.id);
                                                    }
                                                }}

                                            />
                                        </Col>
                                    </Row>
                                </Fragment>
                            }
                            description={<Text type="secondary" style={{fontSize: "10px"}}>{GetRoundedFileSize(file!.fileSize, lang)}</Text>}
                        />
                    </List.Item>
                )}
            />}
            <Button type="primary" icon={<FolderOpenOutlined/>} block style={{marginBottom: "10px"}}
                    onClick={showModal}>File Browser</Button>
            <Modal
                title={<Fragment><FolderOpenOutlined/> File Browser</Fragment>}
                visible={isGalleryModalVisible}
                onOk={onOkGalleryModal}
                onCancel={onCancelGalleryModal}
                width={500}
                footer={null}
                centered
            >
                <FileBrowser/>
            </Modal>
            <Spin tip="Deleting file..." spinning={deleting}>
                <Dashboard
                    uppy={uppy}
                    height={350}
                    showRemoveButtonAfterComplete={true}
                    proudlyDisplayPoweredByUppy={false}
                    showLinkToFileUploadResult={false}
                    showProgressDetails={true}
                    hidePauseResumeButton={false}
                />
            </Spin>
        </Fragment>
    );
}

export default observer(Attachments);