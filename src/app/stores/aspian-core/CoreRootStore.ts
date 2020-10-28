import {createContext} from 'react';
import PostStore from './post/postStore';
import LocaleStore from './locale/localeStore';
import SiderStore from './layout/siderStore';
import ResultStore from './layout/resultStore/resultStore';
import UserStore from './user/userStore';
import { configure } from 'mobx';
import AttachmentStore from "./attachment/attachmentStore";
import TaxonomyStore from "./taxonomy/taxonomyStore";

configure({ enforceActions: 'observed' });

export class CoreRootStore {
    agent: any;
    attachmentStore: AttachmentStore;
    taxonomyStore: TaxonomyStore;
    postStore: PostStore;
    localeStore: LocaleStore;
    siderStore: SiderStore;
    resultStore: ResultStore;
    userStore: UserStore;

    constructor() {
        this.attachmentStore = new AttachmentStore(this);
        this.taxonomyStore = new TaxonomyStore(this);
        this.postStore = new PostStore(this);
        this.localeStore = new LocaleStore(this);
        this.siderStore = new SiderStore(this);
        this.resultStore = new ResultStore(this);
        this.userStore = new UserStore(this);
    }
}

export const CoreRootStoreContext = createContext(new CoreRootStore());