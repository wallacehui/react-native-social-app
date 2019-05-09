import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Post } from "../models/post";
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
  post: Post;
}

type Props = NavigationScreenProps<RouteProps>;

interface State {
  post: Post;
}

export default class CommentListScreen extends React.PureComponent<
  Props,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Comments</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      post: this.props.navigation.getParam("post"),
    };
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}
