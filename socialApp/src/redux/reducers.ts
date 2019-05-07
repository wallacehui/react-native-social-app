import { combineReducers } from "redux";
import user, { State as UserState } from "./reducers/user";

export interface State {
  user: UserState;
}

export default combineReducers<State>({ user });
