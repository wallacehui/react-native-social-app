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
import PhotoListScreen from "./screens/PhotoListScreen";
import UserPostListScreen from "./screens/UserPostListScreen";
import CommentListScreen from "./screens/CommentListScreen";

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
    PhotoListScreen: {
      screen: PhotoListScreen,
    },
    UserPostListScreen: {
      screen: UserPostListScreen,
    },
    CommentListScreen: {
      screen: CommentListScreen,
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
