import React, {FC, Fragment, MouseEvent, ReactText, useEffect,} from 'react';
import {Button, Col, message, Popconfirm, Row, Table, Typography,} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';
import {DeleteFilled,} from '@ant-design/icons';
import '../../../scss/pages/posts/all-posts/_all-posts.scss';
import {useTranslation} from 'react-i18next';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import {SorterResult} from 'antd/es/table/interface';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import '../../../scss/components/modern-calendar/_persian-datepicker.scss';
import {e2p} from '../../../js-ts/base/NumberConverter';
import PostListColumns from "./PostListColumns";
import PostListDataSource from "./PostListDataSource";
import {ColumnDataIndexEnum, IPostAntdTable} from "./types";
import {connect} from "react-redux";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {IPostStateType} from "../../../app/store/reducers/post/postReducerTypes";
import {ILocaleStateType} from "../../../app/store/reducers/locale/localeReducerTypes";
import {
    deletePosts,
    DirectionActionTypeEnum,
    LanguageActionTypeEnum,
    loadPosts,
    setCurrentPage,
    setDateRange,
    setDeleteRangeBtn,
    setPostListWindowWidth,
    setSearchedColumn,
    setSearchText,
    setSelectedDayRange,
    setSelectedRowKeys,
    setTargetBtn
} from "../../../app/store/actions";

interface IPostListProps {
    post: IPostStateType;
    locale: ILocaleStateType;
    loadPosts: Function;
    deletePosts: Function;
    setDateRange: typeof setDateRange;
    setSearchText: typeof setSearchText;
    setSearchedColumn: typeof setSearchedColumn;
    setSelectedDayRange: typeof setSelectedDayRange;
    setSelectedRowKeys: typeof setSelectedRowKeys;
    setTargetBtn: typeof setTargetBtn;

    setCurrentPage: typeof setCurrentPage;
    setDeleteRangeBtn: typeof setDeleteRangeBtn;
    setPostListWindowWidth: typeof setPostListWindowWidth;
}

const PostList: FC<IPostListProps> = ({
                                          post, locale,
                                          loadPosts, deletePosts, setDateRange,
                                          setSearchText, setSearchedColumn, setSelectedDayRange,
                                          setSelectedRowKeys, setTargetBtn, setCurrentPage,
                                          setDeleteRangeBtn, setPostListWindowWidth
                                      }) => {
    const {t} = useTranslation('core_postList');
    // Constants
    /// Default page size
    const DEFAULT_PAGE_SIZE = 10;
    // Column arrays with different types of filters
    /// Columns with search filter
    const SEARCH_FILTERED_COLUMNS: string[] = [
        ColumnDataIndexEnum.TITLE,
        ColumnDataIndexEnum.CATEGORY,
        ColumnDataIndexEnum.STATUS,
        ColumnDataIndexEnum.COMMENT_ALLOWED,
        ColumnDataIndexEnum.PINNED,
        ColumnDataIndexEnum.IP_ADDRESS,
        ColumnDataIndexEnum.CREATED_BY,
        ColumnDataIndexEnum.MODIFIED_BY,
        ColumnDataIndexEnum.USER_AGENT_DEVICE,
        ColumnDataIndexEnum.USER_AGENT_OS,
        ColumnDataIndexEnum.USER_AGENT_BROWSER,
    ];
    /// Columns with DateRange filter
    const DATERANGE_FILTERED_COLUMNS: string[] = [ColumnDataIndexEnum.CREATED_AT, ColumnDataIndexEnum.MODIFIED_AT];
    /// Columns with slider filter
    const SLIDER_FILTERED_COLUMNS: string[] = [
        ColumnDataIndexEnum.ATTACHMENTS,
        ColumnDataIndexEnum.VIEW_COUNT,
        ColumnDataIndexEnum.COMMENTS,
    ];

    const {dir, lang} = locale;
    const {
        loadingInitial, submitting, posts,
        postCount, currentPage, selectedRowKeys,
        deleteRangeBtn, targetBtn
    } = post;

    // On select a row event
    const onSelectChange = (selectedRowKeys: ReactText[]) => {
        selectedRowKeys.length > 0
            ? setDeleteRangeBtn(false)
            : setDeleteRangeBtn(true);
        setSelectedRowKeys(selectedRowKeys);
    };

    // Row selection functionality implementation
    const rowSelection: TableRowSelection<object> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: t('row-selection-menu.items.select-odd-row'),
                onSelect: (changeableRowKeys: ReactText[]) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: t('row-selection-menu.items.select-even-row'),
                onSelect: (changeableRowKeys: ReactText[]) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };


    useEffect(() => {
        if (posts.length === 0) {
            loadPosts(DEFAULT_PAGE_SIZE, 0);
        }

        window.addEventListener('resize', (event) => {
            setPostListWindowWidth(window.innerWidth);
        });

        if (selectedRowKeys.length === 0) {
            setDeleteRangeBtn(true);
        }
    }, [selectedRowKeys.length, posts, loadPosts, setDeleteRangeBtn, setPostListWindowWidth]);


    const confirm = async (e: MouseEvent | undefined) => {
        try {
            await deletePosts(selectedRowKeys as string[]);
            message.success(t("messages.posts-deleting-success"));
        } catch (error) {
            message.error(t("messages.posts-deleting-error"));
        }

        setSelectedRowKeys([]);
        await loadPosts(DEFAULT_PAGE_SIZE, currentPage - 1);
    };

    return (
        <Fragment>
            <Row align="bottom">
                <Col span={12}>
                    <Typography>
                        <Title level={4}>{t('title')}</Title>
                        <Paragraph ellipsis>
                            <Text type="secondary">{t('text')}</Text>
                        </Paragraph>
                    </Typography>
                </Col>
                <Col
                    span={12}
                    style={{
                        textAlign:
                            dir === DirectionActionTypeEnum.LTR
                                ? 'right'
                                : 'left',
                    }}
                >
                    <Popconfirm
                        title={t('button.delete.popConfirm.title')}
                        onConfirm={confirm}
                        okText={t('button.delete.popConfirm.okText')}
                        cancelText={t('button.delete.popConfirm.cancelText')}
                        placement={
                            lang === LanguageActionTypeEnum.en ? 'left' : 'right'
                        }
                        okButtonProps={{danger: true}}
                    >
                        <Button
                            id="delete_range_btn"
                            disabled={deleteRangeBtn}
                            loading={targetBtn === 'delete_range_btn' && submitting}
                            onClick={(e) => setTargetBtn(e.currentTarget.id)}
                            type="primary"
                            danger
                            icon={<DeleteFilled/>}
                            size="small"
                            style={{marginBottom: '1rem'}}
                        >
                            {t('button.delete.name')}
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Row>
                <Table<IPostAntdTable>
                    loading={loadingInitial}
                    bordered
                    rowSelection={rowSelection}
                    columns={PostListColumns(
                        lang, post, loadPosts, deletePosts, setDateRange,
                        setSearchText, setSearchedColumn, setSelectedDayRange,
                        setSelectedRowKeys, setTargetBtn
                    )}
                    dataSource={PostListDataSource(lang, posts)}
                    size="small"
                    scroll={{x: window.innerWidth - 100, y: window.innerHeight - 100}}
                    pagination={{
                        size: 'small',
                        current: currentPage,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => {
                            const localizedRangeZero =
                                lang === LanguageActionTypeEnum.fa
                                    ? e2p(range[0].toString())
                                    : range[0];
                            const localizedRangeOne =
                                lang === LanguageActionTypeEnum.fa
                                    ? e2p(range[1].toString())
                                    : range[1];
                            const localizedTotal =
                                lang === LanguageActionTypeEnum.fa
                                    ? e2p(total.toString())
                                    : total;
                            const of = t('table.pagination.show-total.of');
                            const items = t('table.pagination.show-total.items');
                            return `${localizedRangeZero}-${localizedRangeOne} ${of} ${localizedTotal} ${items}`;
                        },
                        total: postCount,
                        responsive: true,
                    }}
                    onChange={(pagination, filters, sorter) => {
                        const sort = sorter as SorterResult<IPostAntdTable>;
                        let filterKey;
                        let filterValue;
                        let startDate;
                        let endDate;
                        let startNumber;
                        let endNumber;
                        for (const [key, value] of Object.entries(filters)) {
                            if (value && SEARCH_FILTERED_COLUMNS.includes(key)) {
                                filterKey = key;
                                filterValue = value[0];
                            }
                            if (value && DATERANGE_FILTERED_COLUMNS.includes(key)) {
                                filterKey = key;
                                startDate = value![0];
                                endDate = value![1];
                            }
                            if (value && SLIDER_FILTERED_COLUMNS.includes(key)) {
                                filterKey = key;
                                startNumber = value[0] as number;
                                endNumber = value[1] as number;
                            }
                        }
                        setCurrentPage(pagination.current ? pagination.current! : 1);
                        loadPosts(
                            pagination.pageSize,
                            pagination.current ? pagination.current! - 1 : undefined,
                            filterKey,
                            filterValue?.toString(),
                            sort.field?.toString(),
                            sort.order?.toString(),
                            startDate?.toString(),
                            endDate?.toString(),
                            startNumber,
                            endNumber
                        );
                    }}
                />
            </Row>
        </Fragment>
    );
};

// Redux State To Map
const mapStateToProps = ({post, locale}: IStoreState): { post: IPostStateType, locale: ILocaleStateType } => {
    return {post, locale}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    loadPosts, deletePosts, setDateRange,
    setSearchText, setSearchedColumn,
    setSelectedDayRange, setSelectedRowKeys,
    setTargetBtn, setCurrentPage, setDeleteRangeBtn,
    setPostListWindowWidth
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
