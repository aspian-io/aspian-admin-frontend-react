import {ITaxonomy} from "./taxonomy";
import {AttachmentTypeEnum} from "./attachment";

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
  postStatus: PostStatusEnum;
  commentAllowed: boolean;
  order: number;
  viewCount: number;
  type: PostTypeEnum;
  isPinned: boolean;
  pinOrder: number;
  comments: number;
  childPosts: number;
  createdAt: Date;
  createdBy: User;
  modifiedAt: string;
  modifiedBy: User;
  userAgent: string;
  userIPAddress: string;
  postAttachments: PostAttachment[];
  taxonomyPosts: ITaxonomyPost[];
}

export interface IPostFormValues {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  slug: string;
  postStatus: PostStatusEnum;
  scheduledFor: string;
  commentAllowed: boolean;
  order: number;
  type: PostTypeEnum;
  isPinned: boolean;
  pinOrder: number;
  postAttachments: PostAttachment[];
  parentId: string;
  taxonomyPosts: ITaxonomyPost[];
}

export enum PostStatusEnum {
  Publish = 'Publish',
  Future = 'Future',
  Draft = 'Draft',
  Pending = 'Pending',
  Private = 'Private',
  Trash = 'Trash',
  AutoDraft = 'AutoDraft',
  Inherit = 'Inherit',
}

export enum PostTypeEnum {
  Posts,
  Products,
  Pages,
}

export class PostFormValues implements IPostFormValues {
  id: string = '';
  title: string = '';
  subtitle: string = '';
  excerpt: string = '';
  content: string = '';
  slug: string = '';
  postStatus: PostStatusEnum = PostStatusEnum.Publish;
  scheduledFor: string = '';
  commentAllowed: boolean = true;
  order: number = 0;
  type: PostTypeEnum = PostTypeEnum.Posts;
  isPinned: boolean = false;
  pinOrder: number = 0;
  postAttachments: PostAttachment[] = [];
  parentId: string = '';
  taxonomyPosts: ITaxonomyPost[] = [];

  constructor(init?: IPostFormValues) {
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

interface PostAttachment {
  isMain: boolean;
  attachment: IAttachment;
}

export enum UploadLocationEnum {
  LocalHost,
  FtpServer,
}

interface IAttachment {
  type: AttachmentTypeEnum;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadLocation: UploadLocationEnum;
  relativePath: string;
  IsMain: boolean;
}

export interface ITaxonomyPost {
  taxonomy: ITaxonomy;
}