import { observable, action, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { IPost } from '../../models/aspian-core/post';
import agent from '../../api/aspian-core/agent';

configure({ enforceActions: 'observed' });

export class PostStore {
  @observable posts: IPost[] = [];
  @observable loadingInitial = false;

  @action loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const posts = await agent.Posts.list();
      runInAction(() => {
        this.posts = posts;
      });
    } catch (error) {
      console.log(error);
    }
    runInAction(() => {
      this.loadingInitial = false;
    });
  };
}

export default createContext(new PostStore());
