// Import TinyMCE
import tinymce from 'tinymce/tinymce';
// Additional language packs to support
import './langs/fa';
import './langs/fa_IR';
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';
// A theme is also required
import 'tinymce/themes/silver';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis.js';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/legacyoutput';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';
import {FileBrowserCallerTypeEnum, FileBrowserModalTypeEnum} from "../../../components/media/fileBrowser/types";
import {
    DirectionActionTypeEnum,
    ISetPostContentAction,
    LanguageActionTypeEnum,
    setPostContent,
} from "../../../app/store/actions";
import {AttachmentTypeEnum} from "../../../app/models/attachment";
import store from "../../../app/store/store";
import agent from "../../../app/api/aspian-core/agent";
import {useDispatch} from "react-redux";
import {IPostInitFormValues} from "../../../app/models/post";

// copy tinymce skins directory to the root
require.context(
    '!file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
    true,
    /.*/
);

// TinyMCE File Picker Callback Invoker
const mceCallbackInvoker = (mceCallback: any) => {
    document.querySelectorAll(".insertFileToDest").forEach((el) => {
        el.addEventListener("click", () => {
            setTimeout(() => {
                mceCallback(
                    agent.Attachments.getFilePrependUrl() + store.getState().attachment.lastChosenFileForTinyMce?.fileName,
                    {title: store.getState().attachment.lastChosenFileForTinyMce?.fileName}
                );
            }, 500);
        })
    })
}

// TinyMCE Init
const FullTextEditorInit = (selectorId: string,
                            height: number = 250,
                            showFileBrowserModal: Function,
                            fileBrowser: Function,
                            requiredInputsOnChange: () => void,
                            postContent: string
) => {
    // Redux states
    const state = store.getState();

    const editorDir = state.locale.dir === DirectionActionTypeEnum.RTL ? "rtl" : "ltr";
    const editorLang = state.locale.lang === LanguageActionTypeEnum.fa ? "fa" : null;

    tinymce.init({
        selector: `#${selectorId}`,
        directionality: editorDir,
        language: editorLang,
        height: height,
        setup: (editor: any) => {
            editor.on("keyup", (e: any) => {
                const content = editor.getContent();
                store.dispatch(setPostContent(content));
                requiredInputsOnChange();
                // const editorTextareaTag = document.querySelector(`#${selectorId}`);
                // editorTextareaTag!.innerHTML = content;
                // const postContentChanged = new Event("change");
                // editorTextareaTag!.dispatchEvent(postContentChanged);
            })
            editor.on("SetContent", (e: any) => {
                requiredInputsOnChange();
            })
        },
        plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code ' +
            'visualblocks visualchars fullscreen image link media template codesample table charmap hr ' +
            'pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern ' +
            'noneditable help charmap emoticons quickbars',

        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect ' +
            '| alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist ' +
            '| forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print ' +
            '| insertfile image media template link anchor codesample | ltr rtl | code',

        toolbar_sticky: true,
        media_live_embeds: true,
        video_template_callback: function (data: any) {
            return '<video class="forTest" width="' + data.width + '" height="' + data.height +
                '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' +
                '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') +
                ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' +
                    (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
        },
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
            {title: 'My page 1', value: 'http://www.tinymce.com'},
            {title: 'My page 2', value: 'http://www.moxiecode.com'},
        ],
        image_list: [
            {title: 'My page 1', value: 'http://www.tinymce.com'},
            {title: 'My page 2', value: 'http://www.moxiecode.com'},
        ],
        image_class_list: [
            {title: 'None', value: ''},
            {title: 'Some class', value: 'class-name'},
        ],
        importcss_append: true,
        file_picker_callback: function (callback: any, value: any, meta: any) {
            /* Provide file and text for the link dialog */

            if (meta.filetype === 'file') {
                showFileBrowserModal(FileBrowserModalTypeEnum.MISCELLANEOUS_FILE_BROWSER, FileBrowserCallerTypeEnum.POST_CREATE_TINYMCE);
                if (store.getState().attachment.miscellaneousFileBrowserDataSource.length === 0) {
                    fileBrowser(AttachmentTypeEnum.Other).then(() => {
                        mceCallbackInvoker(callback)
                    });
                } else {
                    mceCallbackInvoker(callback);
                }
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
                showFileBrowserModal(FileBrowserModalTypeEnum.PHOTO_FILE_BROWSER, FileBrowserCallerTypeEnum.POST_CREATE_TINYMCE);
                if (store.getState().attachment.photoFileBrowserDataSource.length === 0) {
                    fileBrowser(AttachmentTypeEnum.Photo).then(() => {
                        mceCallbackInvoker(callback)
                    });
                } else {
                    mceCallbackInvoker(callback);
                }
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
                showFileBrowserModal(FileBrowserModalTypeEnum.VIDEO_FILE_BROWSER, FileBrowserCallerTypeEnum.POST_CREATE_TINYMCE);
                if (store.getState().attachment.videoFileBrowserDataSource.length === 0) {
                    fileBrowser(AttachmentTypeEnum.Video).then(() => {
                        mceCallbackInvoker(callback)
                    });
                } else {
                    mceCallbackInvoker(callback);
                }
            }

        },
        templates: [
            {
                title: 'New Table',
                description: 'creates a new table',
                content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr>' +
                    '<th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
                title: 'Starting my story',
                description: 'A cure for writers block',
                content: 'Once upon a time...',
            },
            {
                title: 'New list with dates',
                description: 'New List with dates',
                content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span>' +
                    '<h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        image_caption: true,
        quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    }).then((editor: any) => {
        tinymce.get(selectorId).setContent(postContent);
    });
};

export default FullTextEditorInit;
