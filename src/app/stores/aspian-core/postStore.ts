import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IPost } from '../../models/aspian-core/post';
import agent from '../../api/aspian-core/agent';

class PostStore {
  @observable posts: IPost[] = [];
  @observable loadingInitial = false;

  @action loadPosts = async () => {
    this.loadingInitial = true;

      const posts = await agent.Posts.list();
      posts.forEach((post) => {
        //post.createdAt = post.createdAt.toISOString();
        //post.modifiedAt = post.modifiedAt.split('.')[0];

        this.posts.push(post);
      })
      this.loadingInitial = false;
  }
}

export default createContext(new PostStore());
