import axios from 'axios';
import {IPost, IPostSubmitFormValues, IPostsEnvelope} from '../../models/post';
import {IUser, IUserFormValues} from '../../models/user';
import common from '../common';
import {
    AttachmentTypeEnum,
    IAttachment,
    IAttachmentUploadSettings,
    IFileBrowser
} from "../../models/attachment";
import {ITaxonomy, TaxonomyTypeEnum} from "../../models/taxonomy";
import {ITreeData} from "../../../components/post/postCreate/Categories";
import {ISite, SiteTypeEnum} from "../../models/site";

const {
    axiosRequestInterceptorHandleSuccess,
    axiosRequestInterceptorHandleError,
    axiosResponseInterceptorHandleSuccess,
    axiosResponseInterceptorHandleError,
    baseURL,
    requests,
} = common;

axios.interceptors.request.use(
    axiosRequestInterceptorHandleSuccess,
    axiosRequestInterceptorHandleError
);

axios.interceptors.response.use(
    axiosResponseInterceptorHandleSuccess,
    axiosResponseInterceptorHandleError
);

const Attachments = {
    fileBrowser: (type: AttachmentTypeEnum | "" = ""): Promise<IFileBrowser[]> => requests.get(`/v1/attachments/filebrowser?type=${type}`),
    fileBrowserFileDetails: (fileName: string): Promise<IFileBrowser> => requests.get(`/v1/attachments/filebrowser-filedetails/${fileName}`),
    getFileUrl: (fileName: string): string =>
        axios.getUri({url: `${baseURL}/v1/attachments/download/${fileName}`}),
    getFilePrependUrl: (): string => `${baseURL}/v1/attachments/download/`,
    uploadFile: (file: Blob): Promise<IAttachment> => requests.postForm(`/v1/attachments`, file),
    deleteTusFile: (id: string) => requests.del(`/v1/attachments/deletetusfile/${id}`),
    uploadSettings: (): Promise<IAttachmentUploadSettings> => requests.get("/v1/attachments/upload-settings")
};

const Taxonomies = {
    list: (type: TaxonomyTypeEnum | null = null): Promise<ITaxonomy[]> => requests.get(`/v1/taxonomies?type=${type}`),
    antDCategoryTreeSelect: (): Promise<ITreeData[]> => requests.get("/v1/taxonomies/antd-category-treeselect"),
    details: (id: string): Promise<ITaxonomy> => requests.get(`/v1/taxonomies/details/${id}`),
    create: (taxonomy: ITaxonomy) => requests.post('/v1/taxonomies/create', taxonomy),
    update: (taxonomy: ITaxonomy) => requests.put(`/v1/taxonomies/edit/${taxonomy.id}`, taxonomy),
    delete: (ids: string[]) => requests.delItems('/v1/taxonomies/delete', ids),
};

const Posts = {
    list: (
        limit?: number,
        page?: number,
        filterKey: string = '',
        filterValue: string = '',
        field: string = '',
        order: string = '',
        startDate: string = '',
        endDate: string = '',
        startNumber: number | '' = '',
        endNumber: number | '' = ''
    ): Promise<IPostsEnvelope> =>
        requests.get(
            `/v1/posts?limit=${
                limit
            }&offset=${
                page ? page * limit! : 0
            }&field=${
                field
            }&order=${
                order
            }&filterKey=${
                filterKey
            }&filterValue=${
                filterValue
            }&startDate=${
                startDate
            }&endDate=${
                endDate
            }&startNumber=${
                startNumber
            }&endNumber=${
                endNumber
            }`
        ),

    antDPostsTreeSelect: (): Promise<ITreeData[]> => requests.get("/v1/posts/antd-parent-post-treeselect"),

    details: (id: string): Promise<IPost> =>
        requests.get(`/v1/posts/details/${id}`),

    create: (post: IPostSubmitFormValues) => requests.post('/v1/posts/create', post),
    update: (post: IPostSubmitFormValues) => requests.put(`/v1/posts/edit/${post.id}`, post),
    delete: (ids: string[]) => requests.delItems('/v1/posts/delete', ids),
};

const User = {
    current: (): Promise<IUser> => requests.get('/v1/user'),
    login: (user: IUserFormValues): Promise<IUser> =>
        requests.post('/v1/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> =>
        requests.post('/v1/user/register', user),
    refresh: (): Promise<IUser> => requests.get('/v1/user/refresh-token'),
    logout: (): Promise<void> => requests.post('/v1/user/logout', {}),
};

const Site = {
    details: (siteType: SiteTypeEnum): Promise<ISite> => requests.get(`/v1/sites/${siteType}`)
}

export default {
    Attachments,
    Taxonomies,
    Posts,
    User,
    Site
};
