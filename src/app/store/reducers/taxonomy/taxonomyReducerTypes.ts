import {ITreeData} from "../../../../components/post/postCreate/Categories";
import {ITaxonomy} from "../../../models/taxonomy";

export interface ITaxonomyStateType {
    readonly loadingInitial: boolean;
    readonly catTreeSelectLoading: boolean;
    readonly catsTreeSelect: ITreeData[];
    readonly categories: ITaxonomy[];
}