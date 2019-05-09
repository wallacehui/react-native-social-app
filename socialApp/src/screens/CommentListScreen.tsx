import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Post } from "../models/post";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { ReduxState, Dispatch } from "../redux/store";
import { selectComments } from "../redux/reducers/comment";
import { bindActionCreators } from "redux";
import { fetchCommentsByPost } from "../redux/actions/comment";
import { Comment } from "../models/comment";
import { connect } from "react-redux";

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

interface MapProps {
  comments: Comment[];
}

type Props = NavigationScreenProps<RouteProps> &
  MapProps &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  post: Post;
}

function mapStateToProps(state: ReduxState) {
  return {
    comments: selectComments(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    commentAction: bindActionCreators({ fetchCommentsByPost }, dispatch),
  };
}

class CommentListScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Comments</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      post: this.props.navigation.getParam("post"),
    };
  }

  componentDidMount() {
    this.props.commentAction.fetchCommentsByPost(this.state.post);
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListScreen);
