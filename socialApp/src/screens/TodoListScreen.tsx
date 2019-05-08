import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { User } from "../models/user";

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

export default class TodoListScreen extends React.PureComponent<Props> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Todos</Text>,
  };

  render() {
    return <View style={styles.rootContainer} />;
  }
}
