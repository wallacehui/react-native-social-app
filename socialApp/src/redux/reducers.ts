import { combineReducers } from "redux";
import user, { State as UserState } from "./reducers/user";
import todo, { State as TodoState } from "./reducers/todo";

export interface State {
  user: UserState;
  todo: TodoState;
}

export default combineReducers<State>({ user, todo });
