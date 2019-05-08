import * as React from "react";
import { View, StyleSheet } from "react-native";
import { User } from "../models/user";
import { NavigationScreenProps } from "react-navigation";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "yellow",
  },
});

export interface RouteProps {
  user: User;
}

type Props = NavigationScreenProps<RouteProps>;

export default class UserDetailScreen extends React.PureComponent<Props> {
  render() {
    return <View style={styles.rootContainer} />;
  }
}
