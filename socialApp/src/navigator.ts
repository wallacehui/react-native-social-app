import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import PostListScreen from "./screens/PostListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import TodoListScreen from "./screens/TodoListScreen";
import AlbumListScreen from "./screens/AlbumListScreen";

const UserTabStackNavigator = createStackNavigator(
  {
    UserListScreen: {
      screen: UserListScreen,
    },
    UserDetailScreen: {
      screen: UserDetailScreen,
    },
    TodoListScreen: {
      screen: TodoListScreen,
    },
    AlbumListScreen: {
      screen: AlbumListScreen,
    },
  },
  {
    initialRouteName: "UserListScreen",
    headerLayoutPreset: "center",
  }
);

const MainTabNavigator = createBottomTabNavigator(
  {
    PostListTab: {
      screen: PostListScreen,
    },
    UserListTab: {
      screen: UserTabStackNavigator,
    },
  },
  {
    initialRouteName: "PostListTab",
    backBehavior: "none",
  }
);

export const AppNavigator = createAppContainer(MainTabNavigator);
