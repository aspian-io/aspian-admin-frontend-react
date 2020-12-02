import React, {FC, Fragment, useEffect} from "react";
import TextArea from "antd/es/input/TextArea";
import FullTextEditorInit from "../../../../js-ts/aspian-core/vendors/tinymce5/FullEditor";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {fileBrowser, showFileBrowserModal, setPostContent} from "../../../../app/store/aspian-core/actions";
import {connect} from "react-redux";

interface ITextEditorProps {
    lastChosenFileKey: string;
    fileBrowser: Function;
    showFileBrowserModal: Function;
    requiredInputsOnChange: () => void;
    editorDefaultHeight: number;
    setPostContent: typeof setPostContent;
}

const TextEditor: FC<ITextEditorProps> = ({
                                              lastChosenFileKey, fileBrowser,
                                              showFileBrowserModal, requiredInputsOnChange,
                                              editorDefaultHeight, setPostContent
                                          }) => {

    const getChosenFileName = () => {
        const input = document.getElementById("lastChosenFileKey") as HTMLInputElement;
        return input.value;
    };

    ///
    useEffect(() => {
        document.querySelector("#addPostEditor")!.addEventListener("change", (e) => {
            requiredInputsOnChange();
        })
        // Customized TinyMCE Editor Init
        FullTextEditorInit(
            "addPostEditor", editorDefaultHeight,
            getChosenFileName, showFileBrowserModal, fileBrowser, setPostContent);

    }, [editorDefaultHeight, fileBrowser, requiredInputsOnChange, setPostContent, showFileBrowserModal]);

    return (
        <Fragment>
            <input type="hidden" id="lastChosenFileKey" value={lastChosenFileKey}/>
            <TextArea
                id="addPostEditor"
            />
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({attachment}: IStoreState): { lastChosenFileKey: string } => {
    return {lastChosenFileKey: attachment.lastChosenFileKey}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    fileBrowser,
    showFileBrowserModal,
    setPostContent
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);