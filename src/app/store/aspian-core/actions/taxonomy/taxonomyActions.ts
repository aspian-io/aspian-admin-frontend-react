import {Dispatch} from "redux";
import {
    ICatTreeSelectLoadingAction,
    ICreateCategoryAction,
    ILoadAllCategoriesAction,
    ILoadAntdTreeSelectCompatibleCategoriesAction,
    ITaxonomyLoadingInitialAction,
    TaxonomyActionTypes
} from "./taxonomyActionTypes";
import agent from "../../../../api/aspian-core/agent";
import {ITaxonomy, TaxonomyTypeEnum} from "../../../../models/aspian-core/taxonomy";
import {ITreeData} from "../../../../../components/aspian-core/post/postCreate/Categories";

export const setTaxonomyLoadingInitial = (loadingInitial: boolean): ITaxonomyLoadingInitialAction => {
    return {
        type: TaxonomyActionTypes.TAXONOMY_LOADING_INITIAL,
        payload: {loadingInitial}
    }
}

export const loadAllCategories = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setTaxonomyLoadingInitial(true));

        const categories = await agent.Taxonomies.list(TaxonomyTypeEnum.category);

        dispatch<ILoadAllCategoriesAction>({
            type: TaxonomyActionTypes.LOAD_ALL_CATEGORIES,
            payload: {
                loadingInitial: false,
                categories
            }
        })
    } catch (error) {
        console.log(error);
        dispatch(setTaxonomyLoadingInitial(false));
    }
}

export const setCatTreeSelectLoading = (catTreeSelectLoading: boolean): ICatTreeSelectLoadingAction => {
    return {
        type: TaxonomyActionTypes.CAT_TREESELECT_LOADING,
        payload: {catTreeSelectLoading}
    }
}

export const loadAntdTreeSelectCompatibleCategories = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setCatTreeSelectLoading(true));

        const catsTreeSelect = await agent.Taxonomies.antDCategoryTreeSelect();

        dispatch<ILoadAntdTreeSelectCompatibleCategoriesAction>( {
            type: TaxonomyActionTypes.LOAD_ANTD_TREESELECT_COMPATIBLE_CATEGORIES,
            payload: {
                catTreeSelectLoading: false,
                catsTreeSelect
            }
        })

    } catch (error) {
        console.log(error);
        dispatch(setCatTreeSelectLoading(false));
    }
}
export const createCategory = (taxonomy: ITaxonomy) => async (dispatch: Dispatch) => {
    dispatch(setTaxonomyLoadingInitial(true));
    taxonomy.type = TaxonomyTypeEnum.category;

    try {
        await agent.Taxonomies.create(taxonomy);

        let newCatForTreeSelect: ITreeData = {
            key: taxonomy.id,
            title: taxonomy.term.name,
            value: taxonomy.id,
            children: []
        }

        dispatch<ICreateCategoryAction>({
            type: TaxonomyActionTypes.CREATE_CATEGORY,
            payload: {
                loadingInitial: false,
                newCatForTreeSelect,
                parentId: taxonomy.parentId
            },
        })
    } catch (error) {
        console.log(error);
        dispatch(setTaxonomyLoadingInitial(false));
        throw error;
    }
}