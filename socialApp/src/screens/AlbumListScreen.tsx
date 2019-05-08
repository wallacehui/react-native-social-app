import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
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

interface State {
  user: User;
}

type Props = NavigationScreenProps<RouteProps>;

export default class AlbumListScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Albums</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      user: props.navigation.getParam("user"),
    };
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}
