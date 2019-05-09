import { Todo } from "../../models/todo";
import { Action } from "../actions";
import produce from "immer";
import { ReduxState } from "../store";

export interface State {
  todoMap: { [id: number]: Todo };
  todoIds: number[];
}

const initialState: State = {
  todoMap: {},
  todoIds: [],
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchTodosAction": {
        const todos = action.payload.todos;
        draft.todoIds = todos.map(todo => todo.id);
        for (const todo of todos) {
          draft.todoMap[todo.id] = todo;
        }
        break;
      }
      case "WillFetchTodosAction": {
        draft.todoIds = [];
        break;
      }
    }
  });
}

export function selectTodos(state: ReduxState): Todo[] {
  const todos: Todo[] = [];
  for (const id of state.todo.todoIds) {
    const todo = state.todo.todoMap[id];
    if (todo) {
      todos.push(todo);
    }
  }
  return todos;
}
