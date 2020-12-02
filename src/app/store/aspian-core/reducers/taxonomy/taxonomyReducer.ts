import {TaxonomyAction, TaxonomyActionTypes} from "../../actions";
import {ITaxonomyStateType} from "./taxonomyReducerTypes";
import {ITreeData} from "../../../../../components/aspian-core/post/postCreate/Categories";

const initialState: ITaxonomyStateType = {
    loadingInitial: false,
    catTreeSelectLoading: false,
    catsTreeSelect: [],
    categories: []
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
            const catsTreeSelect: ITreeData[] = Object.assign([], state.catsTreeSelect);
            const parentCatIndex = !!action.payload.parentId ?
                catsTreeSelect.findIndex(post => post.key === action.payload.parentId) : null;

            !!parentCatIndex ?
                catsTreeSelect[parentCatIndex].children.push(action.payload.newCatForTreeSelect) :
                catsTreeSelect.push(action.payload.newCatForTreeSelect)

            return {...state, ...action.payload, catsTreeSelect}
        default:
            return state;
    }
}