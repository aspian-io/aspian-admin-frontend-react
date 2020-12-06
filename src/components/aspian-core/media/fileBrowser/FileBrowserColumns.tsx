import React, {Fragment, useState} from "react";
import {Button, Input, Space, Tooltip} from "antd";
import {EyeOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {ColumnsType} from "antd/lib/table/interface";
import {FileBrowserColumnDataIndexEnum, IFileBrowserAntdTable} from "./types";
import agent from "../../../../app/api/aspian-core/agent";
import {
    DirectionActionTypeEnum,
    IOnOkFileBrowserModalAction,
    ISetChosenFileKeyAction,
    ISetLastSelectedVideoMimeTypeAction,
    setIsFilePreviewModalVisible
} from "../../../../app/store/aspian-core/actions";
import {ColumnType} from "antd/es/table";
import {useTranslation} from "react-i18next";
import store from "../../../../app/store/store";

const FileBrowserColumns = (setChosenFileKey: (key: string) => ISetChosenFileKeyAction,
                            onOkFileBrowserModal: () => IOnOkFileBrowserModalAction,
                            dir: DirectionActionTypeEnum,
                            setLastSelectedVideoFileMimeType: (lastSelectedVideoMimeType: string) => ISetLastSelectedVideoMimeTypeAction) => {

    const {t} = useTranslation('core_media');

    const [searchText, setSearchText] = useState<React.ReactText>('');
    const [searchedColumn, setSearchedColumn] = useState<string | number | React.ReactText[] | undefined>('');

    let searchInput: Input;
    // Column search props
    const getColumnSearchProps = (dataIndex: string): ColumnType<any> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node!;
                    }}
                    placeholder={`${t('file-browser.search-input-placeholder')}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        {t("file-browser.search")}
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        {t("file-browser.reset")}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },

        render: (text: React.ReactText) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText.toString()]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (
        selectedKeys: React.ReactText[],
        confirm: () => void,
        dataIndex: string | number | React.ReactText[] | undefined) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex)
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
        clearFilters!();
        setSearchText('');
    };

    const columns: ColumnsType<IFileBrowserAntdTable> = [
        {
            title: t("file-browser.file-name"),
            width: 150,
            dataIndex: FileBrowserColumnDataIndexEnum.PUBLIC_FILE_NAME,
            ...getColumnSearchProps(FileBrowserColumnDataIndexEnum.PUBLIC_FILE_NAME),
        },
        {
            title: t("file-browser.action"),
            width: 50,
            dataIndex: FileBrowserColumnDataIndexEnum.ACTIONS,
            align: 'center',
            render: (text, record, index) => (
                <Fragment>
                    {(store.getState().attachment.isPhotoFileBrowserActive
                        || store.getState().attachment.isVideoFileBrowserActive) &&

                    <Space direction="horizontal">
                        <Tooltip title={t("file-browser.tooltip.view")} placement="top">
                            <Button
                                style={dir === DirectionActionTypeEnum.RTL ? {lineHeight: 1.9} : {lineHeight: "initial"}}
                                shape="circle"
                                size="small"
                                icon={<EyeOutlined/>}
                                onClick={() => {
                                    setChosenFileKey(agent.Attachments.getFilePrependUrl() + record.fileName);
                                    if (store.getState().attachment.isVideoFileBrowserActive) {
                                        setLastSelectedVideoFileMimeType(record.mimeType!);
                                    }
                                    store.dispatch(setIsFilePreviewModalVisible(true))
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={t("file-browser.tooltip.insert")} placement="top">
                            <Button
                                className="insertFileToMce"
                                style={dir === DirectionActionTypeEnum.RTL ? {lineHeight: 1.9} : {lineHeight: "initial"}}
                                type="primary"
                                shape="circle"
                                size="small"
                                icon={<PlusOutlined/>}
                                onClick={() => {
                                    setChosenFileKey(agent.Attachments.getFilePrependUrl() + record.fileName);
                                    onOkFileBrowserModal();
                                }}
                            />
                        </Tooltip>
                    </Space>
                    }
                    {(store.getState().attachment.isMiscellaneousFileBrowserActive
                        || store.getState().attachment.isFileBrowserActive) &&
                    <Tooltip title={t("file-browser.tooltip.insert")} placement="top">
                        <Button
                            className="insertFileToMce"
                            style={dir === DirectionActionTypeEnum.RTL ? {lineHeight: 1.9} : {lineHeight: "initial"}}
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<PlusOutlined/>}
                            onClick={() => {
                                setChosenFileKey(agent.Attachments.getFilePrependUrl() + record.fileName);
                                onOkFileBrowserModal();
                            }}
                        />
                    </Tooltip>
                    }
                </Fragment>

            )
        }
    ];
    return (columns);
}

export default FileBrowserColumns;