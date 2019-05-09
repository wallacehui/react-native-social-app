import { DidFetchUsersAction } from "./actions/user";
import { DidFetchTodosAction, WillFetchTodosAction } from "./actions/todo";
import { DidFetchAlbumsAction, WillFetchAlbumsAction } from "./actions/album";
import {
  WillFetchPhotosAction,
  DidFetchPhotosAction,
  WillRefreshPhotosAction,
} from "./actions/photo";

export type Action =
  | DidFetchUsersAction
  | DidFetchTodosAction
  | WillFetchTodosAction
  | DidFetchAlbumsAction
  | WillFetchAlbumsAction
  | WillFetchPhotosAction
  | DidFetchPhotosAction
  | WillRefreshPhotosAction;
