import { RouteProps as UserDetailScreenProps } from "./screens/UserDetailScreen";
import { RouteProps as TodoListScreenProps } from "./screens/TodoListScreen";

export function makeUserDetailScreenRoute(
  props: UserDetailScreenProps
): ["UserDetailScreen", UserDetailScreenProps] {
  return ["UserDetailScreen", props];
}

export function makeTodoListScreenRoute(
  props: TodoListScreenProps
): ["TodoListScreen", TodoListScreenProps] {
  return ["TodoListScreen", props];
}
