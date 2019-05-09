import { RouteProps as UserDetailScreenProps } from "./screens/UserDetailScreen";
import { RouteProps as TodoListScreenProps } from "./screens/TodoListScreen";
import { RouteProps as AlbumListScreenProps } from "./screens/AlbumListScreen";
import { RouteProps as PhotoListScreenProps } from "./screens/PhotoListScreen";

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

export function makeAlbumListScreenRoute(
  props: AlbumListScreenProps
): ["AlbumListScreen", AlbumListScreenProps] {
  return ["AlbumListScreen", props];
}

export function makePhotoListScreenRoute(
  props: PhotoListScreenProps
): ["PhotoListScreen", PhotoListScreenProps] {
  return ["PhotoListScreen", props];
}
