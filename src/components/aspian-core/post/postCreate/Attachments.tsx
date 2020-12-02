import React, {FC, Fragment, useEffect} from "react";

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '../../../../scss/aspian-core/components/uppy/_uppy-custom.scss';
import English from "@uppy/locales/lib/en_US";
import Persian from "@uppy/locales/lib/fa_IR";
import {
    addNewUploadedFileToFileBrowser,
    getUploadSettings,
    LanguageActionTypeEnum
} from "../../../../app/store/aspian-core/actions";
import {connect} from "react-redux";
import store from "../../../../app/store/store";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {IAttachmentUploadSettings} from "../../../../app/models/aspian-core/attachment";

interface IAttachmentsProps {
    lang: LanguageActionTypeEnum;
    uploadSettings: IAttachmentUploadSettings | null;
    postVisibility: string;
    getUploadSettings: Function;
    addNewUploadedFileToFileBrowser: Function;
}

const Attachments: FC<IAttachmentsProps> = ({
                                                lang,
                                                uploadSettings,
                                                postVisibility, getUploadSettings,
                                                addNewUploadedFileToFileBrowser
                                            }) => {
    //const {t} = useTranslation('core_postCreate');

    const uppy = Uppy({
        locale: lang === LanguageActionTypeEnum.fa ? Persian : English,
        autoProceed: uploadSettings?.isAutoProceedUploadAllowed,
        allowMultipleUploads: uploadSettings?.isMultipleUploadAllowed,

        restrictions: {
            maxFileSize: uploadSettings?.uploadMaxAllowedFileSize ?? (50 * 1024 * 1024),
            maxNumberOfFiles: uploadSettings?.uploadMaxAllowedNumberOfFiles ?? 3,
            minNumberOfFiles: uploadSettings?.uploadMinAllowedNumberOfFiles ?? 1,
            allowedFileTypes: uploadSettings?.uploadAllowedFileTypes ?? ['image/*', 'video/*']
        }
    })

    const uppyPublic = Uppy({
        locale: lang === LanguageActionTypeEnum.fa ? Persian : English,
        autoProceed: uploadSettings?.isAutoProceedUploadAllowed,
        allowMultipleUploads: uploadSettings?.isMultipleUploadAllowed,

        restrictions: {
            maxFileSize: uploadSettings?.uploadMaxAllowedFileSize ?? (50 * 1024 * 1024),
            maxNumberOfFiles: uploadSettings?.uploadMaxAllowedNumberOfFiles ?? 3,
            minNumberOfFiles: uploadSettings?.uploadMinAllowedNumberOfFiles ?? 1,
            allowedFileTypes: uploadSettings?.uploadAllowedFileTypes ?? ['image/*', 'video/*']
        }
    })

    uppy.use(Tus, {
        endpoint: 'http://localhost:5001/api/v1/attachments/add-private-media',
        onBeforeRequest: (req) => {
            const xhr = req.getUnderlyingObject()
            xhr.withCredentials = true
        }
    })

    uppyPublic.use(Tus, {
        endpoint: 'http://localhost:5001/api/v1/attachments/add-public-media',
        onBeforeRequest: (req) => {
            const xhr = req.getUnderlyingObject()
            xhr.withCredentials = true
        }
    })

    uppy.on('upload-success', (file, response) => {
        const uploadURL = response.uploadURL;
        const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);
        // Add new uploaded file to file browser's file list
        addNewUploadedFileToFileBrowser(
            tusFileId, store.getState().attachment.photoFileBrowserDataSource,
            store.getState().attachment.videoFileBrowserDataSource,
            store.getState().attachment.miscellaneousFileBrowserDataSource,
            store.getState().attachment.fileBrowserDataSource);
    })

    uppyPublic.on('upload-success', (file, response) => {
        const uploadURL = response.uploadURL;
        const tusFileId = uploadURL.substring(uploadURL.lastIndexOf("/") + 1);

        addNewUploadedFileToFileBrowser(
            tusFileId, store.getState().attachment.photoFileBrowserDataSource,
            store.getState().attachment.videoFileBrowserDataSource,
            store.getState().attachment.miscellaneousFileBrowserDataSource,
            store.getState().attachment.fileBrowserDataSource);
    })


    ///
    useEffect(() => {
        if (!uploadSettings) getUploadSettings();
    }, [uploadSettings, getUploadSettings])

    return (
        <Fragment>
            {postVisibility === "private" &&
            <Dashboard
                uppy={uppy}
                height={350}
                showRemoveButtonAfterComplete={false}
                proudlyDisplayPoweredByUppy={false}
                showLinkToFileUploadResult={false}
                showProgressDetails={true}
                hidePauseResumeButton={false}
            />
            }
            {postVisibility === "public" &&
            <Dashboard
                uppy={uppyPublic}
                height={350}
                showRemoveButtonAfterComplete={false}
                proudlyDisplayPoweredByUppy={false}
                showLinkToFileUploadResult={false}
                showProgressDetails={true}
                hidePauseResumeButton={false}
            />
            }
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({attachment, locale, post}: IStoreState):
    {
        lang: LanguageActionTypeEnum,
        uploadSettings: IAttachmentUploadSettings | null,
        postVisibility: string
    } => {
    return {
        lang: locale.lang,
        postVisibility: post.postVisibility,
        uploadSettings: attachment.uploadSettings
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    getUploadSettings,
    addNewUploadedFileToFileBrowser
}

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);