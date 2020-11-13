import React, {Fragment, useContext, useEffect} from "react";
import {message, Table} from 'antd';
import FileBrowserDataSource from "./FileBrowserDataSource";
import {IFileBrowserAntdTable} from "./types";
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {observer} from "mobx-react-lite";
import FileBrowserColumns from "./FileBrowserColumns";
import Text from "antd/es/typography/Text";

const FileBrowser = () => {
    // Stores
    const coreRootStore = useContext(CoreRootStoreContext);
    const {
        fileBrowserLoading, fileBrowser, fileBrowserRegistry, addedFileKeysFromFileBrowser
    } = coreRootStore.attachmentStore;

    //
    useEffect(() => {
        if (fileBrowserRegistry.size === 0)
            fileBrowser().catch(() => message.error('Error loading File Browser!'));
    }, [fileBrowserRegistry.size, fileBrowser]);


    return (
        <Fragment>
            <Table<IFileBrowserAntdTable> loading={fileBrowserLoading}
                                          size="small"
                                          columns={FileBrowserColumns()}
                                          dataSource={FileBrowserDataSource()}
                                          pagination={{pageSize: 1000, hideOnSinglePage: true}}
                                          scroll={{y: 500}}
            />
            {addedFileKeysFromFileBrowser.length > 0 &&
            <Fragment>
                <br/>
                <Text className="text primary-color" style={{fontSize: "12px"}}>
                    {addedFileKeysFromFileBrowser.length > 1 ?
                        `${addedFileKeysFromFileBrowser.length} files added` :
                        `${addedFileKeysFromFileBrowser.length} file added`}
                </Text>
            </Fragment>
            }
        </Fragment>
    );
}

export default observer(FileBrowser);