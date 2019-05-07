import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import PostListScreen from "./screens/PostListScreen";
import UserListScreen from "./screens/UserListScreen";

const MainTabNavigator = createBottomTabNavigator(
  {
    PostListTab: {
      screen: PostListScreen,
    },
    UserListTab: {
      screen: UserListScreen,
    },
  },
  {
    initialRouteName: "PostListTab",
    backBehavior: "none",
  }
);

export const AppNavigator = createAppContainer(MainTabNavigator);
