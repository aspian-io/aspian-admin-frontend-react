import axios, { AxiosResponse } from 'axios';
import { IPost } from '../../models/aspian-core/post';
import { IUser, IUserFormValues } from '../../models/aspian-core/user';

axios.defaults.baseURL = 'http://localhost:5001/api';

const responseBody = (response: AxiosResponse) => response.data;

// Just for development mode
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Posts = {
  list: (): Promise<IPost[]> => requests.get('/v1/posts'),
  details: (id: string): Promise<IPost> => requests.get(`/v1/posts/details/${id}`),
  create: (post: IPost) => requests.post('/v1/posts/create', post),
  update: (post: IPost) => requests.put(`/v1/posts/edit/${post.id}`, post),
  delete: (id: string) => requests.del(`/posts/delete/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get('v1/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post('v1/user/login', user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post('v1/user/register', user),
};

export default {
  Posts,
  User,
};
