import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { User } from "../models/user";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
});

export interface RouteProps {
  user: User;
}

type Props = NavigationScreenProps<RouteProps>;

interface State {
  user: User;
}

export default class UserPostListScreen extends React.PureComponent<
  Props,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Posts</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("user"),
    };
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}
