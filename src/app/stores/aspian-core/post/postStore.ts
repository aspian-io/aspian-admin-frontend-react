import {action, computed, observable, runInAction} from 'mobx';
import {CoreRootStore} from '../CoreRootStore';
import {IPost} from '../../../models/aspian-core/post';
import agent from '../../../api/aspian-core/agent';
import {history} from '../../../..';

import tinymce from 'tinymce/tinymce';
import React, {ReactText} from "react";
import {EventValue} from "rc-picker/lib/interface";
import {Moment} from "moment";
import {DayRange} from "react-modern-calendar-datepicker";
import {UploadChangeParam, UploadFile} from "antd/es/upload/interface";
import {ITreeData} from "../../../../components/aspian-core/post/postCreate/Categories";

export default class PostStore {
    coreRootStore: CoreRootStore;

    constructor(coreRootStore: CoreRootStore) {
        this.coreRootStore = coreRootStore;
    }

    @observable postRegistry = new Map<string, IPost>();
    @observable post: IPost | undefined = undefined;
    @observable loadingInitial = true;
    @observable submitting = false;
    @observable postsTreeSelectLoading = false;
    @observable postsTreeSelectRegistry = new Map<string, ITreeData>();
    @observable postCount: number = 0;
    @observable maxAttachmentsNumber: number = 0;
    @observable maxViewCount: number = 0;
    @observable maxPostHistories: number = 0;
    @observable maxComments: number = 0;
    @observable maxChildPosts: number = 0;
    @observable postEditorContent: string = '';

    @observable currentPage: number = 1;
    @observable selectedRowKeys: ReactText[] = [];
    @observable deleteRangeBtn: boolean = true;
    @observable searchText: ReactText = '';
    @observable dateRange: [EventValue<Moment>, EventValue<Moment>] = [null, null];
    @observable searchedColumn: string | number | React.ReactText[] | undefined = '';
    @observable postListWindowWidth: number = window.innerWidth;
    @observable selectedDayRange: DayRange = { from: null, to: null };
    @observable targetBtn: string = '';

    @observable publishBtnTxt: string = "Publish";

    @observable antdUploadFileList: UploadFile[] = [];


    @computed get postsByDate() {
        return Array.from(this.postRegistry.values()).sort(
            (a, b) =>
                Date.parse(a.createdAt.toString()) - Date.parse(b.createdAt.toString())
        );
    }

    @action loadPosts = async (
        limit: number = 3,
        page = 0,
        filterKey = '',
        filterValue = '',
        field = '',
        order = '',
        startDate = '',
        endDate = '',
        startNumber: number | '' = '',
        endNumber: number | '' = ''
    ) => {
        this.loadingInitial = true;
        try {
            const postsEnvelope = await agent.Posts.list(
                limit,
                page,
                filterKey,
                filterValue,
                field,
                order,
                startDate,
                endDate,
                startNumber,
                endNumber
            );
            runInAction('loading all posts', () => {
                this.postRegistry.clear();
                postsEnvelope.posts.map((i) => this.postRegistry.set(i.id, i));
                this.postCount = postsEnvelope.postCount;
                this.maxAttachmentsNumber = postsEnvelope.maxAttachmentsNumber;
                this.maxChildPosts = postsEnvelope.maxChildPosts;
                this.maxComments = postsEnvelope.maxComments;
                this.maxViewCount = postsEnvelope.maxViewCount;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction('load all posts remove loading - finally', () => {
                this.loadingInitial = false;
            });
        }
    };

    @action loadAntdTreeSelectCompatiblePosts = async () => {
        this.postsTreeSelectLoading = true;
        try {
            const posts = await agent.Posts.antDPostsTreeSelect();
            runInAction("loadAntdTreeSelectCompatiblePosts - removing loading and setting postsTreeSelectRegistry", () => {
                posts.map((p) => this.postsTreeSelectRegistry.set(p.key, p));
                this.postsTreeSelectLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("loadAntdTreeSelectCompatiblePosts error - remove loading", () => {
                this.postsTreeSelectLoading = false;
            })
        }
    }

    @action deletePosts = async (ids: string[]) => {
        try {
            this.submitting = true;
            await agent.Posts.delete(ids);
            runInAction('deletePosts action - remove loading', () => {
                ids.forEach((i) => this.postRegistry.delete(i));
            });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            runInAction('deletePosts action - remove loading - finally', () => {
                this.submitting = false;
            });
        }
    };

    @action deletePost = async (id: string) => {
        try {
            this.submitting = true;
            await agent.Posts.delete([id]);
            runInAction('deletePost action - remove loading', () => {
                this.postRegistry.delete(id);
            });
            history.push('/admin/posts');
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            runInAction('deletePost action - remove loading - finally', () => {
                this.submitting = false;
            });
        }
    };

    private loadPost = (id: string) => {
        return this.postRegistry.get(id);
    };

    @action getPost = async (id: string) => {
        this.loadingInitial = true;
        const postFromRegistry = this.loadPost(id);
        if (postFromRegistry) {
            this.post = postFromRegistry;
            this.loadingInitial = false;
        } else {
            try {
                const loadedPost = await agent.Posts.details(id);
                runInAction('getPost action - initilizing post', () => {
                    this.post = loadedPost;
                    this.loadingInitial = false;
                });
            } catch (error) {
                console.log(error);
                runInAction('getPost action - remove loading - error', () => {
                    this.loadingInitial = false;
                });
            }
        }
    };

    @action removeAddNewPostTinyMceInstance = () => {
        if (tinymce.EditorManager.activeEditor && tinymce.EditorManager.activeEditor.id === "addPostEditor") {
            this.postEditorContent = tinymce.get("addPostEditor").getContent();
            tinymce.remove('#addPostEditor');
        }
    }

    @action cleanupAddNewPost = () => {
        tinymce.remove('#addPostEditor');
    }

    @action setCurrentPage = (currentPage: number) => {
        this.currentPage = currentPage;
    }

    @action setSelectedRowKeys = (selectedRowKeys: ReactText[]) => {
        this.selectedRowKeys = selectedRowKeys;
    }

    @action setDeleteRangeBtn = (deleteRangeBtn: boolean) => {
        this.deleteRangeBtn = deleteRangeBtn;
    }

    @action setSearchText = (searchText: ReactText) => {
        this.searchText = searchText;
    }

    @action setDateRange = (dateRange: [EventValue<Moment>, EventValue<Moment>]) => {
        this.dateRange = dateRange;
    }

    @action setSearchedColumn = (searchedColumn: string | number | React.ReactText[] | undefined) => {
        this.searchedColumn = searchedColumn;
    }

    @action setPostListWindowWidth = (windowWidth: number) => {
        this.postListWindowWidth = windowWidth;
    }

    @action setSelectedDayRange = (selectedDayRange: DayRange) => {
        this.selectedDayRange = selectedDayRange;
    }

    @action setTargetBtn = (targetBtn: string) => {
        this.targetBtn = targetBtn;
    }

    @action setPublishBtnTxt = (publishBtnTxt: string) => {
        this.publishBtnTxt = publishBtnTxt;
    }

    @action postUploadOnChange = ( fileList: any) => {
        fileList.map((v: any) => {
            this.antdUploadFileList.push(v);
        })
    }

    @action postUploadAttachment = async (file: any) => {
        try {
            const uploadedFile = await agent.Attachments.uploadFile(file);
            runInAction("postUploadAttachment action - ant upload file list init", () => {
                const antUploadedFile: UploadFile = {
                    uid: uploadedFile.id,
                    name: uploadedFile.fileName,
                    type: uploadedFile.type,
                    size: uploadedFile.fileSize,
                    url: agent.Attachments.getFileUrl(uploadedFile.fileName),
                    status: "done",
                    thumbUrl: agent.Attachments.getFileUrl(uploadedFile.fileName),
                };
                this.antdUploadFileList.push(antUploadedFile);
            })

            return '';
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
