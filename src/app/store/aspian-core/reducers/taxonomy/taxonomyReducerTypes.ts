import {ITreeData} from "../../../../../components/aspian-core/post/postCreate/Categories";
import {ITaxonomy} from "../../../../models/aspian-core/taxonomy";

export interface ITaxonomyStateType {
    loadingInitial: boolean;
    catTreeSelectLoading: boolean;
    catsTreeSelect: ITreeData[];
    categories: ITaxonomy[];
}