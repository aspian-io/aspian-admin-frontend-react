import {ITaxonomy} from "./taxonomy";
import {IAttachment} from "./attachment";
import moment from "moment";
import dayjs, {Dayjs} from "dayjs";
import {IFileBrowserAntdTable} from "../../components/media/fileBrowser/types";
import i18n from '../../locales/i18n';

export interface IPostsEnvelope {
    posts: IPost[];
    postCount: number;
    maxAttachmentsNumber: number;
    maxViewCount: number;
    maxComments: number;
    maxChildPosts: number;
}

export interface IPost {
    id: string;
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    slug: string;
    visibility: PostVisibilityEnum;
    postStatus: PostStatusEnum;
    scheduledFor: string;
    commentAllowed: boolean;
    viewCount: number;
    type: PostTypeEnum;
    isPinned: boolean;
    comments: number;
    createdAt: Date;
    createdBy: User;
    modifiedAt: string;
    modifiedBy: User;
    userAgent: string;
    userIPAddress: string;
    postAttachments: IPostAttachment[];
    taxonomyPosts: ITaxonomyPost[];
}

export interface IPostSubmitFormValues {
    id: string;
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    slug: string;
    visibility: PostVisibilityEnum;
    postStatus: PostStatusEnum;
    scheduledFor: string;
    commentAllowed: boolean;
    type: PostTypeEnum;
    isPinned: boolean;
    postAttachments: IPostAttachment[];
    taxonomyPosts: ITaxonomyPost[];
}

export interface IPostInitFormValues {
    id?: string;
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    visibility: PostVisibilityEnum;
    postStatus: PostStatusEnum;
    publishScheduledBtnTxt: string;
    schedulePopoverDate: moment.Moment;
    schedulePopoverTime: moment.Moment;
    confirmedScheduleDate: moment.Moment;
    confirmedScheduleTime: moment.Moment;
    jalaliDate: Dayjs;
    isScheduled: boolean;
    confirmedScheduleDateAndTime: string;
    isPinned: boolean;
    isPending: boolean;
    isCommentAllowed: boolean;
    publishBtnTxt: string;
    featuredImages: IFileBrowserAntdTable[];
    featuredVideos: IFileBrowserAntdTable[];
    defaultFeaturedMedia: string;
    selectedCategories: { value: string, label: string }[];
    tags: string[];
    editing: boolean;
}

export enum PostVisibilityEnum {
    Public,
    Private
}

export enum PostStatusEnum {
    Publish,
    Future,
    Draft,
    Pending,
    AutoDraft,
    Inherit,
}

export enum PostTypeEnum {
    Posts,
    Products,
    Pages,
}

export class PostSubmitFormValues implements IPostSubmitFormValues {
    id: string = '';
    title: string = '';
    subtitle: string = '';
    excerpt: string = '';
    content: string = '';
    slug: string = '';
    visibility: PostVisibilityEnum = PostVisibilityEnum.Public;
    postStatus: PostStatusEnum = PostStatusEnum.Publish;
    scheduledFor: string = '';
    commentAllowed: boolean = true;
    type: PostTypeEnum = PostTypeEnum.Posts;
    isPinned: boolean = false;
    postAttachments: IPostAttachment[] = [];
    taxonomyPosts: ITaxonomyPost[] = [];

    constructor(init?: IPostSubmitFormValues) {
        Object.assign(this, init);
    }
}

export class PostInitFormValues implements IPostInitFormValues {
    id?: string = '';
    title: string = '';
    subtitle: string = '';
    excerpt: string = '';
    content: string = '';
    visibility: PostVisibilityEnum = PostVisibilityEnum.Public;
    postStatus: PostStatusEnum = PostStatusEnum.Publish;
    publishScheduledBtnTxt: string = i18n.t('core_postCreate:collapse.status-and-visibility.content.publish.buttons.immediately');
    schedulePopoverDate: moment.Moment = moment(new Date(), 'YYYY-MM-DD');
    schedulePopoverTime: moment.Moment = moment(new Date(), 'HH:mm:ss');
    confirmedScheduleDate: moment.Moment = moment(new Date(), 'YYYY-MM-DD');
    confirmedScheduleTime: moment.Moment = moment(new Date(), 'HH:mm:ss');
    jalaliDate: Dayjs = dayjs(new Date());
    isScheduled: boolean = false;
    confirmedScheduleDateAndTime: string = '';
    isPinned: boolean = false;
    isPending: boolean = false;
    isCommentAllowed: boolean = true;
    publishBtnTxt: string = i18n.t('core_postCreate:button.publish');
    featuredImages: IFileBrowserAntdTable[] = [];
    featuredVideos: IFileBrowserAntdTable[] = [];
    defaultFeaturedMedia: string = '';
    selectedCategories: { value: string, label: string }[] = [];
    tags: string[] = [];
    editing: boolean = false;

    constructor(init?: IPostInitFormValues) {
        Object.assign(this, init);
    }
}

export interface User {
    id: string;
    displayName: string;
    userName: string;
    email: string;
    bio: string;
    role: string;
    profilePhoto: IAttachment;
}

export interface IPostAttachment {
    isMain: boolean;
    attachmentId: string;
    attachment?: IAttachment;
}

export enum UploadLocationEnum {
    LocalHost,
    FtpServer,
}

export interface ITaxonomyPost {
    taxonomyId?: string;
    taxonomy?: ITaxonomy;
}