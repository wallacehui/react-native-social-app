import * as React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenOptions,
} from "react-navigation";
import UserListScreen from "./screens/UserListScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import TodoListScreen from "./screens/TodoListScreen";
import AlbumListScreen from "./screens/AlbumListScreen";
import PhotoListScreen from "./screens/PhotoListScreen";
import UserPostListScreen from "./screens/UserPostListScreen";
import CommentListScreen from "./screens/CommentListScreen";
import { Image } from "react-native";

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

const userTabNavigationOptions: NavigationScreenOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Image
      style={{
        width: 25,
        height: 25,
        tintColor: tintColor != null ? tintColor : "#4974a2",
      }}
      source={require("../src/resources/images/friends_tab_icon.png")}
    />
  ),
  tabBarLabel: "Friends",
};

UserTabStackNavigator.navigationOptions = userTabNavigationOptions;

const MainTabNavigator = createBottomTabNavigator(
  {
    UserListTab: {
      screen: UserTabStackNavigator,
    },
  },
  {
    initialRouteName: "UserListTab",
    backBehavior: "none",
  }
);

export const AppNavigator = createAppContainer(MainTabNavigator);
