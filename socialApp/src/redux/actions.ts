import { DidFetchUsersAction } from "./actions/user";
import { DidFetchTodosAction } from "./actions/todo";

export type Action = DidFetchUsersAction | DidFetchTodosAction;
