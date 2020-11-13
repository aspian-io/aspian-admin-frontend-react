import React, {useContext} from "react";
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {IFileBrowserAntdTable} from "./types";
import {GetFileTypeIcon} from "../utils/GetFileTypeIcon";

const FileBrowserDataSource = () => {
    // Stores
    const coreRootStore = useContext(CoreRootStoreContext);
    const {fileBrowserRegistry} = coreRootStore.attachmentStore;


    let data: IFileBrowserAntdTable[] = [];
    fileBrowserRegistry.forEach((file, i) => {
        // Initializing columns data
        data.push({
            key: i,
            type: GetFileTypeIcon(file.type),
            publicFileName: file.publicFileName,
            fileName: file.fileName
        });
    });

    return (data);
}

export default FileBrowserDataSource;