import { combineReducers } from "redux";
import user, { State as UserState } from "./reducers/user";
import todo, { State as TodoState } from "./reducers/todo";
import album, { State as AlbumState } from "./reducers/album";
import photo, { State as PhotoState } from "./reducers/photo";
import post, { State as PostState } from "./reducers/post";

export interface State {
  user: UserState;
  todo: TodoState;
  album: AlbumState;
  photo: PhotoState;
  post: PostState;
}

export default combineReducers<State>({ user, todo, album, photo, post });
