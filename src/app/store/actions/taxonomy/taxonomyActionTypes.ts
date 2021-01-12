import {ITaxonomy} from "../../../models/taxonomy";
import {ITreeData} from "../../../../components/post/postCreate/Categories";

////////////////////////
/// Root Action Type ///
////////////////////////


export type TaxonomyAction =
    ITaxonomyLoadingInitialAction
    | ILoadAllCategoriesAction
    | ILoadAntdTreeSelectCompatibleCategoriesAction
    | ICatTreeSelectLoadingAction
    | ICreateCategoryAction

/////////////
/// Types ///
/////////////
export enum TaxonomyActionTypes {
    TAXONOMY_LOADING_INITIAL = "TAXONOMY_LOADING_INITIAL",
    LOAD_ALL_CATEGORIES = "LOAD_ALL_CATEGORIES",
    LOAD_ANTD_TREESELECT_COMPATIBLE_CATEGORIES = "LOAD_ANTD_TREESELECT_COMPATIBLE_CATEGORIES",
    CAT_TREESELECT_LOADING = "CAT_TREESELECT_LOADING",
    CREATE_CATEGORY = "CREATE_CATEGORY"
}

////////////////////
/// Action Types ///
////////////////////
export interface ITaxonomyLoadingInitialAction {
    type: TaxonomyActionTypes.TAXONOMY_LOADING_INITIAL;
    payload: {
        loadingInitial: boolean,
    };
}

export interface ILoadAllCategoriesAction {
    type: TaxonomyActionTypes.LOAD_ALL_CATEGORIES;
    payload: {
        loadingInitial: boolean,
        categories: ITaxonomy[]
    };
}

export interface ICatTreeSelectLoadingAction {
    type: TaxonomyActionTypes.CAT_TREESELECT_LOADING;
    payload: {
        catTreeSelectLoading: boolean,
    };
}

export interface ILoadAntdTreeSelectCompatibleCategoriesAction {
    type: TaxonomyActionTypes.LOAD_ANTD_TREESELECT_COMPATIBLE_CATEGORIES;
    payload: {
        catTreeSelectLoading: boolean,
        catsTreeSelect: ITreeData[]
    };
}

export interface ICreateCategoryAction {
    type: TaxonomyActionTypes.CREATE_CATEGORY,
    payload: {
        loadingInitial: boolean,
        newCatForTreeSelect: ITreeData,
        parentId: string | null
    }
}