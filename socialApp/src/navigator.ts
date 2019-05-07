import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import PostListScreen from "./screens/PostListScreen";
import UserListScreen from "./screens/UserListScreen";

const UserTabStackNavigator = createStackNavigator(
  {
    UserListScreen: {
      screen: UserListScreen,
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
