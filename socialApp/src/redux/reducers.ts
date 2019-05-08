import { combineReducers } from "redux";
import user, { State as UserState } from "./reducers/user";
import todo, { State as TodoState } from "./reducers/todo";
import album, { State as AlbumState } from "./reducers/album";

export interface State {
  user: UserState;
  todo: TodoState;
  album: AlbumState;
}

export default combineReducers<State>({ user, todo, album });
