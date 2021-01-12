import React, {FC, Fragment, useEffect} from "react";
import TextArea from "antd/es/input/TextArea";
import FullTextEditorInit from "../../../js-ts/vendors/tinymce5/FullEditor";
import {clearPostState, fileBrowser, setPostContent, showFileBrowserModal} from "../../../app/store/actions";
import {connect} from "react-redux";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {IPost, IPostInitFormValues} from "../../../app/models/post";
import {RouteComponentProps, withRouter} from "react-router-dom";
import tinymce from "tinymce/tinymce";

interface DetailParams {
    id: string;
}

interface ITextEditorProps {
    postFormLoaded: boolean;
    fileBrowser: Function;
    showFileBrowserModal: Function;
    requiredInputsOnChange: () => void;
    editorDefaultHeight: number;
    post: IPost | null;
    setPostContent: typeof setPostContent;
    clearPostState: typeof clearPostState;
    postInitFormValues: IPostInitFormValues;
}

const TextEditor: FC<ITextEditorProps & RouteComponentProps<DetailParams>> = ({
                                                                                  postFormLoaded,
                                                                                  fileBrowser,
                                                                                  showFileBrowserModal,
                                                                                  requiredInputsOnChange,
                                                                                  editorDefaultHeight,
                                                                                  postInitFormValues,
                                                                                  match,
                                                                                  clearPostState,
                                                                                  post,
                                                                                  setPostContent
                                                                              }) => {
    ///
    useEffect(() => {
        if (match.params.id) {
            if (tinymce.EditorManager.activeEditor?.id !== "addPostEditor") {
                // Customized TinyMCE Editor Init
                postInitFormValues.id === match.params.id && FullTextEditorInit(
                    "addPostEditor", editorDefaultHeight,
                    showFileBrowserModal, fileBrowser, requiredInputsOnChange, postInitFormValues.content);
            }
        } else {
            if (tinymce.EditorManager.activeEditor?.id !== "addPostEditor" && !postInitFormValues.content) {
                // Customized TinyMCE Editor Init
                FullTextEditorInit(
                    "addPostEditor", editorDefaultHeight,
                    showFileBrowserModal, fileBrowser, requiredInputsOnChange, postInitFormValues.content);
            }
        }


    }, [editorDefaultHeight, fileBrowser, match.params.id, postFormLoaded, postInitFormValues.content, postInitFormValues.id, requiredInputsOnChange, showFileBrowserModal]);

    return (
        <Fragment>
            <TextArea
                id="addPostEditor"
            />
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({post}: IStoreState): { post: IPost | null, postInitFormValues: IPostInitFormValues, postFormLoaded: boolean } => {
    return {
        post: post.post,
        postInitFormValues: post.postInitFormValues,
        postFormLoaded: post.postFormLoaded
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    fileBrowser,
    showFileBrowserModal,
    setPostContent,
    clearPostState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextEditor));