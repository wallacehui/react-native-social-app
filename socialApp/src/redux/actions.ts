import { DidFetchUsersAction } from "./actions/user";
import { DidFetchTodosAction, WillFetchTodosAction } from "./actions/todo";
import { DidFetchAlbumsAction, WillFetchAlbumsAction } from "./actions/album";

export type Action =
  | DidFetchUsersAction
  | DidFetchTodosAction
  | WillFetchTodosAction
  | DidFetchAlbumsAction
  | WillFetchAlbumsAction;
