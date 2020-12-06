import {IPost} from "../../../../models/aspian-core/post";
import {ITreeData} from "../../../../../components/aspian-core/post/postCreate/Categories";
import {ReactText} from "react";
import {Moment} from "moment";
import {EventValue} from "rc-picker/lib/interface";
import {DayRange} from "react-modern-calendar-datepicker";

export interface IPostStateType {
    posts: IPost[];
    post: IPost | undefined;
    loadingInitial: boolean;
    submitting: boolean;
    postsTreeSelectLoading: boolean;
    postsTreeSelect: ITreeData[];
    postCount: number;
    maxAttachmentsNumber: number;
    maxViewCount: number;
    maxPostHistories: number;
    maxComments: number;
    maxChildPosts: number;
    postEditorContent: string;
    currentPage: number;
    selectedRowKeys: ReactText[];
    deleteRangeBtn: boolean;
    searchText: ReactText;
    dateRange: [EventValue<Moment>, EventValue<Moment>];
    searchedColumn: string | number | ReactText[] | undefined;
    postListWindowWidth: number;
    selectedDayRange: DayRange;
    targetBtn: string;
    publishBtnTxt: string;
    createPostUploadAsPublic: boolean;
    postVisibility: string;
    addedFileNumberToUppy: number;
}