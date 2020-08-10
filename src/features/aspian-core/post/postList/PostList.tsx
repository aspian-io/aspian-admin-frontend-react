import React, { useContext, useEffect, useState, ReactText } from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import { ColumnType } from 'antd/lib/table';
import PostStore from '../../../../app/stores/aspian-core/postStore';
import { observer } from 'mobx-react-lite';
import { TableRowSelection } from 'antd/lib/table/interface';
import { TaxonomyTypeEnum } from '../../../../app/models/aspian-core/post';
import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  DeleteFilled,
  ClockCircleFilled,
} from '@ant-design/icons';
import moment from 'moment';
import '../../../../scss/aspian-core/pages/posts/all-posts/_all-posts.scss';

const PostList = () => {
  const postStore = useContext(PostStore);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);

  const onSelectChange = (selectedRowKeys: ReactText[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<object> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys: ReactText[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
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
        text: 'Select Even Row',
        onSelect: (changableRowKeys: ReactText[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
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

  const columns: ColumnType<object>[] = [
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: 'Category',
      width: 200,
      dataIndex: 'postCategory',
      ellipsis: true,
    },
    {
      title: 'Status',
      width: 100,
      dataIndex: 'postStatus',
    },
    {
      title: 'Attachments',
      width: 130,
      dataIndex: 'postAttachments',
      align: 'center',
    },
    {
      title: 'Comment Allowed',
      width: 200,
      dataIndex: 'commentAllowed',
      align: 'center',
    },
    {
      title: 'View Count',
      width: 200,
      dataIndex: 'viewCount',
      align: 'center',
    },
    {
      title: 'Pinned',
      width: 100,
      dataIndex: 'pinned',
      align: 'center',
    },
    {
      title: 'Histories',
      width: 100,
      dataIndex: 'postHistories',
      align: 'center',
    },
    {
      title: 'Comments',
      width: 120,
      dataIndex: 'comments',
      align: 'center',
    },
    {
      title: 'Child Posts',
      width: 150,
      dataIndex: 'childPosts',
      align: 'center',
    },
    {
      title: 'Created At',
      width: 150,
      dataIndex: 'createdAt',
    },
    {
      title: 'Created By',
      width: 150,
      dataIndex: 'createdBy',
    },
    {
      title: 'Modified At',
      width: 150,
      dataIndex: 'modifiedAt',
    },
    {
      title: 'Modified By',
      width: 150,
      dataIndex: 'modifiedBy',
    },
    {
      title: 'User Agent',
      width: 150,
      dataIndex: 'userAgent',
      ellipsis: true,
    },
    {
      title: 'IP Address',
      width: 150,
      dataIndex: 'userIPAddress',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: () => (
        <Space>
          <Tooltip title="Edit Post" color="gray">
            <Button
              type="link"
              size="middle"
              icon={<EditFilled />}
              className="text warning-color"
            />
          </Tooltip>
          <Tooltip title="Delete Post" color="gray">
            <Button type="link" size="middle" icon={<DeleteFilled />} danger />
          </Tooltip>
          <Tooltip title="Post History" color="gray">
            <Button type="link" size="middle" icon={<ClockCircleFilled />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  let data: object[] = [];

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore]);

  postStore.posts.forEach((post, i) => {
    data.push({
      key: i,
      title: post.title,
      postCategory: post.taxonomyPosts.map((postTaxonomy) =>
        postTaxonomy.taxonomy.type === TaxonomyTypeEnum.category
          ? `${postTaxonomy.taxonomy.term.name} \n`
          : null
      ),
      postStatus: post.postStatus,
      postAttachments: 4,
      commentAllowed: post.commentAllowed ? (
        <CheckOutlined style={{ color: '#52c41a' }} />
      ) : (
        <CloseOutlined style={{ color: '#f5222d' }} />
      ),
      viewCount: post.viewCount,
      pinned: post.isPinned ? (
        <CheckOutlined style={{ color: '#52c41a' }} />
      ) : (
        <CloseOutlined style={{ color: '#f5222d' }} />
      ),
      postHistories: post.postHistories,
      comments: post.comments,
      childPosts: post.childPosts,
      createdAt: moment(post.createdAt).format('YYYY-MM-DD HH:m:s'),
      createdBy: post.createdBy?.userName,
      modifiedAt: post.modifiedAt
        ? moment(post.modifiedAt).format('YYYY-MM-DD HH:m:s')
        : '',
      modifiedBy: post.modifiedBy,
      userAgent: post.userAgent,
      userIPAddress: post.userIPAddress,
    });
  });

  return (
    <Table
      loading={postStore.loadingInitial}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500, y: 400 }}
    />
  );
};

export default observer(PostList);
