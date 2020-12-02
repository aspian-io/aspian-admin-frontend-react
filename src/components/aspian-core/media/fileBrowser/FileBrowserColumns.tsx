import React, {useState} from "react";
import {Button, Input, Space, Tooltip} from "antd";
import {EyeOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {ColumnsType} from "antd/lib/table/interface";
import {FileBrowserColumnDataIndexEnum, IFileBrowserAntdTable} from "./types";
import agent from "../../../../app/api/aspian-core/agent";
import {
    ISetChosenFileKeyAction, IOnOkFileBrowserModalAction
} from "../../../../app/store/aspian-core/actions";
import {ColumnType} from "antd/es/table";

const FileBrowserColumns = (setChosenFileKey: (key: string) => ISetChosenFileKeyAction,
                            onOkFileBrowserModal: () => IOnOkFileBrowserModalAction) => {

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
                    placeholder={`Search ${dataIndex}`}
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
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
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
            title: "Type",
            width: 50,
            dataIndex: FileBrowserColumnDataIndexEnum.TYPE,
        },
        {
            title: "File Name",
            width: 200,
            dataIndex: FileBrowserColumnDataIndexEnum.PUBLIC_FILE_NAME,
            ...getColumnSearchProps(FileBrowserColumnDataIndexEnum.PUBLIC_FILE_NAME),
        },
        {
            title: "Action",
            width: 50,
            dataIndex: FileBrowserColumnDataIndexEnum.ACTIONS,
            align: 'center',
            render: (text, record, index) => (
                <Space direction="horizontal">
                    <Tooltip title="View" placement="top">
                        <Button
                            shape="circle"
                            size="small"
                            icon={<EyeOutlined/>}
                            // onClick={() => {
                            //
                            // }}
                        />
                    </Tooltip>
                    <Tooltip title="Insert" placement="top">
                        <Button
                            className="insertFileToMce"
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
            )
        }
    ];
    return (columns);
}

export default FileBrowserColumns;