import React, {Fragment, useContext} from "react";
import {observer} from "mobx-react-lite";

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {LanguageActionTypeEnum} from "../../../../app/stores/aspian-core/locale/types";
import English from "@uppy/locales/lib/en_US";
import Persian from "@uppy/locales/lib/fa_IR";
import {Spin} from "antd";
//import Dashboard from "@uppy/dashboard";


const Attachments = () => {
    //const {t} = useTranslation('core_postCreate');
    const coreRootStore = useContext(CoreRootStoreContext);
    const {lang} = coreRootStore.localeStore;
    const {deleteUploadedTusFile, deleting} = coreRootStore.attachmentStore;


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

    uppy.use(Tus, {
        endpoint: 'http://localhost:5001/api/v1/post/add-media',
        onBeforeRequest: (req) => {
            const xhr = req.getUnderlyingObject()
            xhr.withCredentials = true
        }
    })

    uppy.on('upload-success', (file, response) => {
        const uploadURL = response.uploadURL;
        const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);
        const tusFileIdsHiddenInput = document.createElement("input");
        tusFileIdsHiddenInput.setAttribute("type", "hidden");
        tusFileIdsHiddenInput.setAttribute("name", "addNewPostMediaId[]");
        tusFileIdsHiddenInput.setAttribute("value", tusFileId);

        const addNewPostForm = document.getElementById("addNewPostForm");
        addNewPostForm?.appendChild(tusFileIdsHiddenInput);
    })


// uppy.on('complete', (result) => {
//     const url = result.successful[0].uploadURL
//     store.dispatch({
//         type: 'SET_USER_AVATAR_URL',
//         payload: { url: url }
//     })
// })


    uppy.on('file-removed', async (file, reason) => {
        const uploadURL = file.response.uploadURL;
        const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);
        await deleteUploadedTusFile(tusFileId);

        if (reason === 'removed-by-user') {
            //sendDeleteRequestForFile(file)
        }
    })


    return (
        <Fragment>
            <Spin tip="Deleting file..." spinning={deleting}>
                <Dashboard
                    uppy={uppy}
                    height={300}
                    showRemoveButtonAfterComplete={true}
                    proudlyDisplayPoweredByUppy={false}
                    showLinkToFileUploadResult={false}
                    showProgressDetails={true}
                />
            </Spin>
        </Fragment>
    );
}

export default observer(Attachments);