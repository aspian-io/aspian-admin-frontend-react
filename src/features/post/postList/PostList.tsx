import React, { useContext, useEffect } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import PostStore from '../../../app/stores/postStore';
import { observer } from 'mobx-react-lite';

function PostList() {
  const postStore = useContext(PostStore);

  const columns: ColumnType<object>[] = [
    {
      title: 'Title',
      width: 100,
      dataIndex: 'title',
      fixed: 'left',
    },
    {
      title: 'Category',
      width: 100,
      dataIndex: 'postCategory',
    },
    {
      title: 'Status',
      dataIndex: 'postStatus',
    },
    {
      title: 'Attachments',
      dataIndex: 'postAttachments',
    },
    {
      title: 'Comment Allowed',
      dataIndex: 'commentAllowed',
    },
    {
      title: 'View Count',
      dataIndex: 'viewCount',
    },
    {
      title: 'Pinned',
      dataIndex: 'pinned',
    },
    {
      title: 'Histories',
      dataIndex: 'postHistories',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
    },
    {
      title: 'Child Posts',
      dataIndex: 'childPosts',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
    },
    {
      title: 'Modified At',
      dataIndex: 'modifiedAt',
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
    },
    {
      title: 'User Agent',
      dataIndex: 'userAgent',
    },
    {
      title: 'IP Address',
      dataIndex: 'userIPAddress',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>Edit</a>,
    },
  ];

  let data: object[] = [];

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore]);

  postStore.posts.forEach((post) => {
    let i = 1;
    data.push({
      key: i,
      title: post.title,
      postCategory: 'category',
      postStatus: post.postStatus.toString(),
      postAttachments: 4,
      commentAllowed: post.commentAllowed,
      viewCount: post.viewCount,
      pinned: post.isPinned,
    });
    i++;
  });

  return (
    <Table
      loading={postStore.loadingInitial}
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500, y: 300 }}
    />
  );
}

export default observer(PostList);
