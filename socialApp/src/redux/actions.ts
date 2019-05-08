import { DidFetchUsersAction } from "./actions/user";
import { DidFetchTodosAction, WillFetchTodosAction } from "./actions/todo";

export type Action =
  | DidFetchUsersAction
  | DidFetchTodosAction
  | WillFetchTodosAction;
