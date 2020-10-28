export interface IPostAntdTable {
    key: string;
    title: JSX.Element;
    postCategory: (JSX.Element | '')[];
    postStatus: any;
    postAttachments: number | string;
    commentAllowed: JSX.Element;
    viewCount: number | string;
    pinned: JSX.Element;
    comments: number | string;
    childPosts: number | string;
    createdAt: string | number;
    createdBy: string;
    modifiedAt: string | number;
    modifiedBy: string;
    device: string | undefined;
    os: string | undefined;
    browser: string | undefined;
    userIPAddress: string | number;
}

export enum ColumnDataIndexEnum {
    TITLE = 'title',
    CATEGORY = 'postCategory',
    STATUS = 'postStatus',
    ATTACHMENTS = 'postAttachments',
    COMMENT_ALLOWED = 'commentAllowed',
    VIEW_COUNT = 'viewCount',
    PINNED = 'pinned',
    COMMENTS = 'comments',
    CHILD_POSTS = 'childPosts',
    CREATED_AT = 'createdAt',
    CREATED_BY = 'createdBy',
    MODIFIED_AT = 'modifiedAt',
    MODIFIED_BY = 'modifiedBy',
    USER_AGENT = 'userAgent',
    USER_AGENT_DEVICE = 'device',
    USER_AGENT_OS = 'os',
    USER_AGENT_BROWSER = 'browser',
    IP_ADDRESS = 'userIPAddress',
    ACTIONS = 'actions',
}