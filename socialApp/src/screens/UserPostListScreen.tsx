import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { User } from "../models/user";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { ReduxState, Dispatch } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchPostsByUser } from "../redux/actions/post";
import { connect } from "react-redux";
import { selectPosts } from "../redux/reducers/post";
import { Post } from "../models/post";

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

interface MapProps {
  posts: Post[];
}

type Props = NavigationScreenProps<RouteProps> &
  MapProps &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  user: User;
}

function mapStateToProps(state: ReduxState) {
  return {
    posts: selectPosts(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    postAction: bindActionCreators({ fetchPostsByUser }, dispatch),
  };
}

class UserPostListScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Posts</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("user"),
    };
  }

  componentDidMount() {
    this.props.postAction.fetchPostsByUser(this.state.user);
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPostListScreen);
