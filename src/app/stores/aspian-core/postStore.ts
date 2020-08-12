import { observable, action, configure, runInAction, computed } from 'mobx';
import { createContext } from 'react';
import { IPost } from '../../models/aspian-core/post';
import agent from '../../api/aspian-core/agent';

configure({ enforceActions: 'observed' });

export class PostStore {
  @observable postRegistry = new Map<string, IPost>();
  @observable posts: IPost[] = [];
  @observable loadingInitial = false;

  @computed get postsByDate() {
    return Array.from(this.postRegistry.values()).sort(
      (a, b) => Date.parse(a.createdAt.toString()) - Date.parse(b.createdAt.toString())
    );
  }

  @action loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const posts = await agent.Posts.list();
      runInAction('loading all posts', () => {
        posts.map(i => this.postRegistry.set(i.id, i));
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load all posts error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}

export default createContext(new PostStore());
