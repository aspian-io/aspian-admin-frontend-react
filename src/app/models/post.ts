export interface IPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  slug: string;
  postStatus: PostStatusEnum;
  commentAllowed: boolean;
  order: number;
  viewCount: number;
  type: PostTypeEnum;
  isPinned: boolean;
  pinOrder: number;
  postHistories: number;
  comments: number;
  childPosts: number;
  createdAt: string;
  createdBy: User;
  modifiedAt: string;
  userAgent: string;
  userIPAddress: string;
  postAttachments: number;
  taxonomyPosts: TaxonomyPosts[];
}

export enum PostStatusEnum {
  Publish,
  Future,
  Draft,
  Pending,
  Private,
  Trash,
  AutoDraft,
  Inherit,
}

export enum PostTypeEnum {
  Posts,
  Products,
  Pages,
}

interface User {
  id: string;
  displayName: string;
  email: string;
  bio: string;
  role: string;
}

interface PostAttachment {
  isMain: boolean;
  attachment: Attachment;
}

interface Attachment {
  fileName: string;
  fileSize: string;
  mimeType: string;
}

interface TaxonomyPosts {
    taxonomy: Taxonomy;
}

interface Taxonomy {
    id: string;
    type: TaxonomyTypeEnum;
    term: Term;
}

enum TaxonomyTypeEnum {
  nav_menu,
  category,
  tag,
}

interface Term {
    id: string;
    Name: string;
}
