import { RouteProps as UserDetailScreenProps } from "./screens/UserDetailScreen";

export function makeUserDetailScreenRoute(
  props: UserDetailScreenProps
): ["UserDetailScreen", UserDetailScreenProps] {
  return ["UserDetailScreen", props];
}
