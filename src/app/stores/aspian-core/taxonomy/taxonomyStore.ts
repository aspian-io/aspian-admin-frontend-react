import {CoreRootStore} from "../CoreRootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../../../api/aspian-core/agent";
import {ITaxonomy, TaxonomyTypeEnum} from "../../../models/aspian-core/taxonomy";
import {ITreeData} from "../../../../components/aspian-core/post/postCreate/Categories";

export default class TaxonomyStore {
    coreRootStore: CoreRootStore;

    constructor(coreRootStore: CoreRootStore) {
        this.coreRootStore = coreRootStore;
    }

    @observable loadingInitial: boolean = false;
    @observable catTreeSelectLoading: boolean = false;
    @observable catTreeSelectRegistry = new Map<string, ITreeData>();
    @observable categoryRegistry = new Map<string, ITaxonomy>();

    @action loadAllCategories = async () => {
        this.loadingInitial = true;

        try {
            const categories = await agent.Taxonomies.list(TaxonomyTypeEnum.category);

            runInAction("loadAllCategories - removing loading and setting categoryRegistry", () => {
                categories.map((c) => this.categoryRegistry.set(c.id, c));
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("loadAllCategories error - remove loading", () => {
                this.loadingInitial = false;
            })
            throw error;
        }
    }

    @action loadCategory = async (id: string) => {
        this.loadingInitial = true;

        try {
            const category = await agent.Taxonomies.details(id);
            runInAction("loadCategory - remove loading", () => {
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("loadCategory error - remove loading", () => {
                this.loadingInitial = false;
            })
        }
    }

    @action loadAntdTreeSelectCompatibleCategories = async () => {
        this.catTreeSelectLoading = true;

        try {
            const categories = await agent.Taxonomies.antDCategoryTreeSelect();
            runInAction("loadAntdTreeSelectCompatibleCategories - remove loading", () => {
                categories.map((c) => this.catTreeSelectRegistry.set(c.key, c));
                this.catTreeSelectLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("loadAntdTreeSelectCompatibleCategories error - remove loading", () => {
                this.catTreeSelectLoading = false;
            })
        }
    }

    @action createCategory = async (taxonomy: ITaxonomy) => {
        this.loadingInitial = true;
        taxonomy.type = TaxonomyTypeEnum.category;

        try {
            await agent.Taxonomies.create(taxonomy);
            await this.loadAntdTreeSelectCompatibleCategories();
            runInAction("createCategory - add category to category registry & remove loading", () => {
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("createCategory error - remove loading", () => {
                this.loadingInitial = false;
            })
            throw error;
        }
    }
}