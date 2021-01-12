import {TaxonomyAction, TaxonomyActionTypes} from "../../actions";
import {ITaxonomyStateType} from "./taxonomyReducerTypes";
import {ITreeData} from "../../../../components/post/postCreate/Categories";

const initialState: ITaxonomyStateType = {
    loadingInitial: false,
    catTreeSelectLoading: false,
    catsTreeSelect: [],
    categories: [],
}

export const taxonomyReducer = (state = initialState, action: TaxonomyAction) => {
    switch (action.type) {
        case TaxonomyActionTypes.TAXONOMY_LOADING_INITIAL:
            return {...state, ...action.payload}
        case TaxonomyActionTypes.LOAD_ALL_CATEGORIES:
            return {...state, ...action.payload}
        case TaxonomyActionTypes.CAT_TREESELECT_LOADING:
            return {...state, ...action.payload}
        case TaxonomyActionTypes.LOAD_ANTD_TREESELECT_COMPATIBLE_CATEGORIES:
            return {...state, ...action.payload}
        case TaxonomyActionTypes.CREATE_CATEGORY:
            return {
                ...state,
                ...action.payload,
                catsTreeSelect: getCatTreeSelect(
                    state.catsTreeSelect,
                    action.payload.newCatForTreeSelect,
                    action.payload.parentId)
            }
        default:
            return state;
    }
}

/// Utilities
const getCatTreeSelect = (
    catsTreeSelectState: ITreeData[],
    newCategory: ITreeData,
    parentId: string | null): ITreeData[] => {
    //
    if (catsTreeSelectState.length > 0) {
        const catsTreeSelectObj: ITreeData[] = Object.assign([], catsTreeSelectState);
        //
        if (parentId) {
            catsTreeSelectObj.forEach((category) => {
                if (category.key === parentId) {
                    category.children.push(newCategory);
                    return catsTreeSelectObj;
                } else {
                    getCatTreeSelect(category.children, newCategory, parentId);
                }
            })
            return catsTreeSelectObj;
        } else {
            catsTreeSelectObj.push(newCategory);
            return catsTreeSelectObj;
        }
    }
    //
    return [];
}