import {ColumnsType} from "antd/lib/table/interface";
import {PostStatusEnum} from "../../../app/models/post";
import {Button, DatePicker, Input, message, Popconfirm, Slider, Space, Tooltip} from "antd";
import {history} from "../../../index";
import {
    CalendarFilled,
    ControlOutlined,
    DeleteFilled,
    EditFilled,
    EyeFilled,
    FilterOutlined,
    SearchOutlined
} from "@ant-design/icons";
import React, {Fragment, ReactText} from "react";
import {ColumnType} from "antd/es/table/interface";
import PersianDatePicker, {DayRange} from "react-modern-calendar-datepicker";
import jalaliMoment from "jalali-moment";
import {EventValue, RangeValue} from "rc-picker/lib/interface";
import {Moment} from "moment";
import Highlighter from "react-highlight-words";
import {useTranslation} from "react-i18next";
import {ColumnDataIndexEnum, IPostAntdTable} from "./types";
import {IPostStateType} from "../../../app/store/reducers/post/postReducerTypes";
import {
    IPostSetTargetBtnAction,
    ISetDateRangeAction,
    ISetPostListSelectedDayRangeAction,
    ISetSearchedColumnAction,
    ISetSearchTextAction,
    ISetSelectedRowKeysAction,
    LanguageActionTypeEnum
} from "../../../app/store/actions";

const PostListColumns = (lang: LanguageActionTypeEnum,
                         post: IPostStateType,
                         loadPosts: Function,
                         deletePosts: Function,
                         setDateRange: (dateRange: [EventValue<Moment>, EventValue<Moment>]) => ISetDateRangeAction,
                         setSearchText: (searchText: ReactText) => ISetSearchTextAction,
                         setSearchedColumn: (searchedColumn: string | number | ReactText[] | undefined) => ISetSearchedColumnAction,
                         setSelectedDayRange: (selectedDayRange: DayRange) => ISetPostListSelectedDayRangeAction,
                         setSelectedRowKeys: (selectedRowKeys: ReactText[]) => ISetSelectedRowKeysAction,
                         setTargetBtn: (targetBtn: string) => IPostSetTargetBtnAction
): ColumnsType<IPostAntdTable> => {
    const {RangePicker} = DatePicker;

    const {t} = useTranslation('core_postList');
    // Constants
    /// Default page size
    const DEFAULT_PAGE_SIZE = 10;

    // Stores
    const {
        loadingInitial, maxViewCount,
        maxAttachmentsNumber, maxComments, maxChildPosts,
        postListWindowWidth, currentPage,
        dateRange, searchText, searchedColumn,
        selectedDayRange, selectedRowKeys,
        targetBtn
    } = post;


    // Custom slider filter functionality implementation
    const getColumnSearchPropsForSliderFilter = (
        dataIndex: string,
        maxNumber: number
    ): ColumnType<any> => ({
        filterDropdown: ({setSelectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Slider
                    range
                    step={1}
                    max={maxNumber + 50}
                    disabled={maxNumber === 0}
                    defaultValue={[0, maxNumber > 20 ? maxNumber : 30]}
                    onAfterChange={(value) => {
                        if (value) {
                            setSelectedKeys([value[0], value[1]]);
                        }
                    }}
                />
                <div>
                    <div style={{marginTop: '10px'}}>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => handleSearchDateRange(confirm, dataIndex)}
                                icon={<FilterOutlined/>}
                                size="small"
                                style={{width: 90}}
                            >
                                {t('table.filters.buttons.filter')}
                            </Button>
                            <Button
                                onClick={() => handleReset(clearFilters)}
                                size="small"
                                style={{width: 90}}
                            >
                                {t('table.filters.buttons.reset')}
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
        ),
        filterIcon: (filtered) => (
            <ControlOutlined
                style={{color: filtered ? '#1890ff' : undefined, fontSize: '13px'}}
            />
        ),
    });

    // Custom date range filter functionality implementation
    const getColumnSearchPropsForDateRangeFilter = (
        dataIndex: string
    ): ColumnType<any> => ({
        filterDropdown: ({setSelectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                {lang === LanguageActionTypeEnum.fa && (
                    <Fragment>
                        <PersianDatePicker
                            inputPlaceholder="از تاریخ --- تا تاریخ"
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            shouldHighlightWeekends
                            locale="fa"
                            calendarPopperPosition="bottom"
                            calendarClassName="persian-datepicker"
                            inputClassName="persian-datepicker-input"
                        />

                        <div>
                            <div style={{marginTop: '10px'}}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            const fromDay = selectedDayRange.from?.day;
                                            const fromMonth = selectedDayRange.from?.month;
                                            const fromYear = selectedDayRange.from?.year;

                                            const toDay = selectedDayRange.to?.day;
                                            const toMonth = selectedDayRange.to?.month;
                                            const toYear = selectedDayRange.to?.year;

                                            const fromInput = `${fromYear}/${fromMonth}/${fromDay}`;
                                            const toInput = `${toYear}/${toMonth}/${toDay}`;

                                            const from = jalaliMoment
                                                .from(fromInput, 'fa', 'YYYY/MM/DD')
                                                .locale('en')
                                                .format('YYYY/MM/DD');

                                            const to = jalaliMoment
                                                .from(toInput, 'fa', 'YYYY/MM/DD')
                                                .locale('en')
                                                .format('YYYY/MM/DD');

                                            setSelectedKeys([from, to]);

                                            confirm();
                                            setSearchedColumn(dataIndex);
                                        }}
                                        icon={<SearchOutlined/>}
                                        size="small"
                                        style={{width: 90}}
                                    >
                                        {t('table.filters.buttons.search')}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            clearFilters!();
                                            setSelectedDayRange({from: null, to: null});
                                            loadPosts(DEFAULT_PAGE_SIZE, 0);
                                        }}
                                        size="small"
                                        style={{width: 90}}
                                    >
                                        {t('table.filters.buttons.reset')}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </Fragment>
                )}

                {lang !== LanguageActionTypeEnum.fa && (
                    <Fragment>
                        <RangePicker
                            value={dateRange}
                            inputReadOnly={true}
                            format="YYYY/MM/DD"
                            onChange={(
                                dates: RangeValue<Moment>,
                                dateStrings: [string, string]
                            ) => {
                                if (dates) {
                                    setDateRange([dates![0], dates![1]]);
                                    setSelectedKeys([
                                        dates![0]?.format('YYYY/MM/DD') as ReactText,
                                        dates![1]?.format('YYYY/MM/DD') as ReactText,
                                    ]);
                                }
                            }}
                        />

                        <div>
                            <div style={{marginTop: '10px'}}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSearchDateRange(confirm, dataIndex)}
                                        icon={<SearchOutlined/>}
                                        size="small"
                                        style={{width: 90}}
                                    >
                                        {t('table.filters.buttons.search')}
                                    </Button>
                                    <Button
                                        onClick={() => handleReset(clearFilters)}
                                        size="small"
                                        style={{width: 90}}
                                    >
                                        {t('table.filters.buttons.reset')}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        ),
        filterIcon: (filtered) => (
            <CalendarFilled style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    });

    const handleSearchDateRange = (
        confirm: () => void,
        dataIndex: string | number | React.ReactText[] | undefined
    ) => {
        confirm();
        setSearchedColumn(dataIndex);
    };

    let searchInput: Input;
    // Custom filter functionality implementation
    const getColumnSearchPropsForSearchFilter = (
        dataIndex: string
    ): ColumnType<any> => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node) => {
                        searchInput = node!;
                    }}
                    placeholder={t('table.filters.inputs.search.placeholder')}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
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
                        {t('table.filters.buttons.search')}
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        {t('table.filters.buttons.reset')}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: React.ReactText) =>
            searchedColumn === dataIndex ? (
                text ? text : ''
            ) : (
                text
            ),
    });

    const handleSearch = (
        selectedKeys: React.ReactText[],
        confirm: () => void,
        dataIndex: string | number | React.ReactText[] | undefined
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
        clearFilters!();
        setSearchText('');
        setDateRange([null, null]);
        loadPosts(DEFAULT_PAGE_SIZE, 0);
    };

    const columns: ColumnsType<IPostAntdTable> = [
        {
            title: t('table.thead.title'),
            width: 200,
            dataIndex: ColumnDataIndexEnum.TITLE,
            fixed: postListWindowWidth > 576 ? 'left' : undefined,
            sorter: true,
            ...getColumnSearchPropsForSearchFilter(ColumnDataIndexEnum.TITLE),
        },
        {
            title: t('table.thead.category'),
            width: 200,
            dataIndex: ColumnDataIndexEnum.CATEGORY,
            ellipsis: true,
            sorter: true,
            ...getColumnSearchPropsForSearchFilter(ColumnDataIndexEnum.CATEGORY),
        },
        {
            title: t('table.thead.status'),
            width: 100,
            dataIndex: ColumnDataIndexEnum.STATUS,
            align: 'center',
            sorter: true,
            filterMultiple: false,
            filters: [
                {
                    text: t('table.filters.post-status.publish'),
                    value: PostStatusEnum.Publish,
                },
                {
                    text: t('table.filters.post-status.pending'),
                    value: PostStatusEnum.Pending,
                },
                {
                    text: t('table.filters.post-status.draft'),
                    value: PostStatusEnum.Draft,
                },
                {
                    text: t('table.filters.post-status.auto-draft'),
                    value: PostStatusEnum.AutoDraft,
                },
                {
                    text: t('table.filters.post-status.future'),
                    value: PostStatusEnum.Future,
                },
                {
                    text: t('table.filters.post-status.inherit'),
                    value: PostStatusEnum.Inherit,
                },
            ],
        },
        {
            title: t('table.thead.attachments'),
            width: 130,
            dataIndex: ColumnDataIndexEnum.ATTACHMENTS,
            align: 'center',
            sorter: true,
            ...getColumnSearchPropsForSliderFilter(
                ColumnDataIndexEnum.ATTACHMENTS,
                maxAttachmentsNumber
            ),
        },
        {
            title: t('table.thead.comment-allowed'),
            width: 200,
            dataIndex: ColumnDataIndexEnum.COMMENT_ALLOWED,
            align: 'center',
            sorter: true,
            filterMultiple: false,
            filters: [
                {
                    text: t('table.filters.comment-allowed.allowed'),
                    value: true,
                },
                {
                    text: t('table.filters.comment-allowed.not-allowed'),
                    value: false,
                },
            ],
        },
        {
            title: t('table.thead.view-count'),
            width: 200,
            dataIndex: ColumnDataIndexEnum.VIEW_COUNT,
            align: 'center',
            sorter: true,
            ...getColumnSearchPropsForSliderFilter(
                ColumnDataIndexEnum.VIEW_COUNT,
                maxViewCount
            ),
        },
        {
            title: t('table.thead.pinned'),
            width: 100,
            dataIndex: ColumnDataIndexEnum.PINNED,
            align: 'center',
            sorter: true,
            filterMultiple: false,
            filters: [
                {
                    text: t('table.filters.is-pinned.pinned'),
                    value: true,
                },
                {
                    text: t('table.filters.is-pinned.not-pinned'),
                    value: false,
                },
            ],
        },
        {
            title: t('table.thead.comments'),
            width: 120,
            dataIndex: ColumnDataIndexEnum.COMMENTS,
            align: 'center',
            sorter: true,
            ...getColumnSearchPropsForSliderFilter(ColumnDataIndexEnum.COMMENTS, maxComments),
        },
        {
            title: t('table.thead.created-at'),
            width: 200,
            dataIndex: ColumnDataIndexEnum.CREATED_AT,
            align: 'center',
            sorter: true,
            ...getColumnSearchPropsForDateRangeFilter(ColumnDataIndexEnum.CREATED_AT),
        },
        {
            title: t('table.thead.created-by'),
            width: 150,
            dataIndex: ColumnDataIndexEnum.CREATED_BY,
            sorter: true,
            ...getColumnSearchPropsForSearchFilter(ColumnDataIndexEnum.CREATED_BY),
        },
        {
            title: t('table.thead.modified-at'),
            width: 150,
            dataIndex: ColumnDataIndexEnum.MODIFIED_AT,
            align: 'center',
            sorter: true,
            ...getColumnSearchPropsForDateRangeFilter(ColumnDataIndexEnum.MODIFIED_AT),
        },
        {
            title: t('table.thead.modified-by'),
            width: 150,
            dataIndex: ColumnDataIndexEnum.MODIFIED_BY,
            sorter: true,
            ...getColumnSearchPropsForSearchFilter(ColumnDataIndexEnum.MODIFIED_BY),
        },
        {
            title: t('table.thead.user-agent.name'),

            dataIndex: ColumnDataIndexEnum.USER_AGENT,
            ellipsis: true,
            children: [
                {
                    title: t('table.thead.user-agent.sub-items.device'),
                    dataIndex: ColumnDataIndexEnum.USER_AGENT_DEVICE,
                    align: 'center',
                    width: 100,
                    filterMultiple: false,
                    filters: [
                        {
                            text: 'Desktop',
                            value: 'desktop',
                        },
                        {
                            text: 'Tablet',
                            value: 'tablet',
                        },
                        {
                            text: 'Mobile',
                            value: 'mobile',
                        },
                    ],
                },
                {
                    title: t('table.thead.user-agent.sub-items.os'),
                    dataIndex: ColumnDataIndexEnum.USER_AGENT_OS,
                    align: 'center',
                    width: 150,
                    filterMultiple: false,
                    filters: [
                        {
                            text: 'macOS',
                            value: 'macOS',
                        },
                        {
                            text: 'Windows',
                            value: 'windows',
                        },
                        {
                            text: 'Linux',
                            value: 'linux',
                        },
                        {
                            text: 'iPadOS',
                            value: 'iPadOS',
                        },
                        {
                            text: 'iPhoneOS',
                            value: 'iPhoneOS',
                        },
                        {
                            text: 'Android',
                            value: 'android',
                        },
                    ],
                },
                {
                    title: t('table.thead.user-agent.sub-items.browser'),
                    dataIndex: ColumnDataIndexEnum.USER_AGENT_BROWSER,
                    align: 'center',
                    width: 170,
                    filterMultiple: false,
                    filters: [
                        {
                            text: 'Chrome',
                            value: 'chrome',
                        },
                        {
                            text: 'Safari',
                            value: 'safari',
                        },
                        {
                            text: 'Firefox',
                            value: 'firefox',
                        },
                        {
                            text: 'Edge',
                            value: 'edge',
                        },
                        {
                            text: 'Internet Explorer',
                            value: 'IE',
                        },
                        {
                            text: 'Opera',
                            value: 'opera',
                        },
                    ],
                },
            ],
        },
        {
            title: t('table.thead.ip-address'),
            width: 150,
            dataIndex: ColumnDataIndexEnum.IP_ADDRESS,
            sorter: true,
            ...getColumnSearchPropsForSearchFilter(ColumnDataIndexEnum.IP_ADDRESS),
        },
        {
            title: t('table.thead.actions'),
            key: ColumnDataIndexEnum.ACTIONS,
            fixed: postListWindowWidth > 576 ? 'right' : undefined,
            width: 150,
            align: 'center',
            render: (text, record, index) => (
                <Space>
                    <Tooltip title={t('table.tooltip.view-post')} color="gray">
                        <Button
                            onClick={() => history.push(`/admin/posts/details/${record.key}`)}
                            type="text"
                            size="middle"
                            icon={<EyeFilled/>}
                            className="text primary-color"
                        />
                    </Tooltip>
                    <Tooltip title={t('table.tooltip.edit-post')} color="gray">
                        <Button
                            onClick={() => history.push(`/admin/posts/edit/${record.key}`)}
                            type="text"
                            size="middle"
                            icon={<EditFilled/>}
                            className="text warning-color"
                        />
                    </Tooltip>
                    <Tooltip
                        title={t('table.tooltip.delete-post')}
                        color="gray"
                    >
                        <Popconfirm
                            title={t('button.delete.popConfirm.single-item-title')}
                            onConfirm={() => onSingleRecordDeleteBtnClick(record)}
                            okText={t('button.delete.popConfirm.okText')}
                            cancelText={t('button.delete.popConfirm.cancelText')}
                            placement={
                                lang === LanguageActionTypeEnum.en
                                    ? 'left'
                                    : 'right'
                            }
                            okButtonProps={{
                                danger: true,
                            }}
                        >
                            <Button
                                id={record.key}
                                onClick={(e) => setTargetBtn(e.currentTarget.id)}
                                loading={targetBtn === record.key && loadingInitial}
                                type="text"
                                size="middle"
                                icon={<DeleteFilled/>}
                                danger
                            />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const onSingleRecordDeleteBtnClick = async (record: IPostAntdTable) => {
        try {
            await deletePosts([record.key]);
            message.success(t("messages.post-deleting-success"));
        } catch (error) {
            message.error(t("messages.post-deleting-error"));
        }

        const existedSelectedRowKeys = selectedRowKeys.filter(
            (value, index, arr) => {
                return value !== record.key;
            }
        );
        setSelectedRowKeys(existedSelectedRowKeys);
        await loadPosts(DEFAULT_PAGE_SIZE, currentPage - 1);
    };

    return (columns);
}

export default PostListColumns;