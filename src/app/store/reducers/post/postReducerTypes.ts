import {IPost, IPostInitFormValues, IPostSubmitFormValues} from "../../../models/post";
import {ITreeData} from "../../../../components/post/postCreate/Categories";
import {ReactText} from "react";
import moment, {Moment} from "moment";
import {EventValue} from "rc-picker/lib/interface";
import {DayRange} from "react-modern-calendar-datepicker";
import {Dayjs} from "dayjs";

export interface IPostStateType {
    readonly posts: IPost[];
    readonly post: IPost | null;
    readonly loadingInitial: boolean;
    readonly submitting: boolean;
    readonly postsTreeSelectLoading: boolean;
    readonly postsTreeSelect: ITreeData[];
    readonly postCount: number;
    readonly maxAttachmentsNumber: number;
    readonly maxViewCount: number;
    readonly maxPostHistories: number;
    readonly maxComments: number;
    readonly maxChildPosts: number;
    readonly currentPage: number;
    readonly selectedRowKeys: ReactText[];
    readonly deleteRangeBtn: boolean;
    readonly searchText: ReactText;
    readonly dateRange: [EventValue<Moment>, EventValue<Moment>];
    readonly searchedColumn: string | number | ReactText[] | undefined;
    readonly postListWindowWidth: number;
    readonly selectedDayRange: DayRange;
    readonly targetBtn: string;
    readonly createPostUploadAsPublic: boolean;
    readonly addedFileNumberToUppy: number;
    readonly postFormLoaded: boolean;
    readonly postSubmitFormValues: IPostSubmitFormValues;
    readonly postInitFormValues: IPostInitFormValues;
}