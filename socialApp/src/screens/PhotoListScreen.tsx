import * as React from "react";
import { Album } from "../models/album";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { StyleSheet, View, Text } from "react-native";

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
  album: Album;
}

type Props = NavigationScreenProps<RouteProps>;

export default class PhotoListScreen extends React.PureComponent<Props> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<RouteProps>): NavigationScreenOptions => ({
    headerTitle: (
      <Text style={styles.title}>{navigation.getParam("album").title}</Text>
    ),
  });

  render() {
    return <View style={styles.rootContainer} />;
  }
}
