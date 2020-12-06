import React, {FC, Fragment, useEffect} from "react";

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '../../../../scss/aspian-core/components/uppy/_uppy-custom.scss';
import '../../../../scss/aspian-core/components/uppy/_uppy-rtl.scss';
import '../../../../scss/aspian-core/components/uppy/_uppy-fa.scss';
import English from "@uppy/locales/lib/en_US";
import Persian from "@uppy/locales/lib/fa_IR";
import {
    addNewUploadedFileToFileBrowser, DirectionActionTypeEnum,
    getUploadSettings,
    LanguageActionTypeEnum,
    setCreatePostAddedFileNumberToUppy,
    setIsLangBtnDisabled
} from "../../../../app/store/aspian-core/actions";
import {connect} from "react-redux";
import store from "../../../../app/store/store";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {IAttachmentUploadSettings} from "../../../../app/models/aspian-core/attachment";

interface IAttachmentsProps {
    lang: LanguageActionTypeEnum;
    dir: DirectionActionTypeEnum;
    uploadSettings: IAttachmentUploadSettings | null;
    postVisibility: string;
    getUploadSettings: Function;
    addNewUploadedFileToFileBrowser: Function;
    setIsLangBtnDisabled: typeof setIsLangBtnDisabled;
    setCreatePostAddedFileNumberToUppy: Function;
}

const Attachments: FC<IAttachmentsProps> = ({
                                                lang,
                                                dir,
                                                uploadSettings,
                                                postVisibility, getUploadSettings,
                                                addNewUploadedFileToFileBrowser, setIsLangBtnDisabled,
                                                setCreatePostAddedFileNumberToUppy
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

    uppy.on('upload', () => {
        if(store.getState().locale.dir === DirectionActionTypeEnum.RTL) {
            const uppyStatusBarElem = document.getElementsByClassName("uppy-StatusBar-actions")[0];
            if (!uppyStatusBarElem?.classList.contains("my-uppy-StatusBar-actions--rtl")) {
                uppyStatusBarElem?.classList.add("my-uppy-StatusBar-actions--rtl");
            }
        }
    })

    uppyPublic.on('upload', () => {
        if(store.getState().locale.dir === DirectionActionTypeEnum.RTL) {
            const uppyItemElem = document.getElementsByClassName("uppy-Dashboard-Item")[0];
            uppyItemElem.setAttribute("style", "padding: 10px 10px 10px 0");
            const uppyStatusBarElem = document.getElementsByClassName("uppy-StatusBar-actions")[0];
            if (!uppyStatusBarElem?.classList.contains("my-uppy-StatusBar-actions--rtl")) {
                uppyStatusBarElem?.classList.add("my-uppy-StatusBar-actions--rtl");
            }
        }
    })

    uppy.on('progress', () => {
        if(store.getState().locale.dir === DirectionActionTypeEnum.RTL) {
            const uppyRootElem = document.getElementsByClassName("uppy-Root")[0];
            if (!uppyRootElem.classList.contains("my-uppy-root--rtl")) {
                uppyRootElem.classList.add("my-uppy-root--rtl");
            }
            const uppyStatusBarElem = document.getElementsByClassName("uppy-StatusBar-actions")[0];
            if (!uppyStatusBarElem?.classList.contains("my-uppy-StatusBar-actions--rtl")) {
                uppyStatusBarElem?.classList.add("my-uppy-StatusBar-actions--rtl");
            }
        }
    })

    uppyPublic.on('progress', () => {
        if(store.getState().locale.dir === DirectionActionTypeEnum.RTL) {
            const uppyRootElem = document.getElementsByClassName("uppy-Root")[0];
            if (!uppyRootElem.classList.contains("my-uppy-root--rtl")) {
                uppyRootElem.classList.add("my-uppy-root--rtl");
            }
            const uppyStatusBarElem = document.getElementsByClassName("uppy-StatusBar-actions")[0];
            if (!uppyStatusBarElem?.classList.contains("my-uppy-StatusBar-actions--rtl")) {
                uppyStatusBarElem?.classList.add("my-uppy-StatusBar-actions--rtl");
            }
        }
    })

    uppy.on('file-added', () => {
        setCreatePostAddedFileNumberToUppy(store.getState().post.addedFileNumberToUppy + 1)
    })

    uppy.on('file-removed', () => {
        setCreatePostAddedFileNumberToUppy(store.getState().post.addedFileNumberToUppy - 1)
    })

    uppyPublic.on('file-added', () => {
        setCreatePostAddedFileNumberToUppy(store.getState().post.addedFileNumberToUppy + 1)
    })

    uppyPublic.on('file-removed', () => {
        setCreatePostAddedFileNumberToUppy(store.getState().post.addedFileNumberToUppy - 1)
    })


    ///
    useEffect(() => {
        //
        if (!uploadSettings) getUploadSettings();
        //
        if(dir === DirectionActionTypeEnum.RTL) {
            const uppyRootElem = document.getElementsByClassName("uppy-Root")[0];
            if (!uppyRootElem.classList.contains("my-uppy-root--rtl")) {
                uppyRootElem.classList.add("my-uppy-root--rtl");
            }
            const uppyInnerWrapElem = document.getElementsByClassName("uppy-Dashboard-innerWrap")[0];
            if (!uppyInnerWrapElem.classList.contains("my-uppy-fa")) {
                uppyInnerWrapElem.classList.add("my-uppy-fa");
            }
            const uppyAddFileTitleElem = document.getElementsByClassName("uppy-Dashboard-AddFiles-title")[0];
            if (!uppyAddFileTitleElem.classList.contains("my-uppy-fa")) {
                uppyAddFileTitleElem.classList.add("my-uppy-fa");
            }
        }
    }, [getUploadSettings, uploadSettings, dir])

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
        postVisibility: string,
        dir: DirectionActionTypeEnum
    } => {
    return {
        lang: locale.lang,
        dir: locale.dir,
        postVisibility: post.postVisibility,
        uploadSettings: attachment.uploadSettings,
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    getUploadSettings,
    addNewUploadedFileToFileBrowser,
    setIsLangBtnDisabled,
    setCreatePostAddedFileNumberToUppy
}

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);