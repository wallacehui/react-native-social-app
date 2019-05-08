import { Todo } from "../../models/todo";
import { User } from "../../models/user";
import { ThunkAction } from "../store";

export interface DidFetchTodosAction {
  type: "DidFetchTodosAction";
  payload: {
    todos: Todo[];
  };
}

function didFetchTodosAction(todos: Todo[]): DidFetchTodosAction {
  return {
    type: "DidFetchTodosAction",
    payload: {
      todos: todos,
    },
  };
}

export function fetchTodosByUser(user: User): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    const todos = await apiClient.queryTodosByUser(user.id);
    dispatch(didFetchTodosAction(todos));
  };
}
