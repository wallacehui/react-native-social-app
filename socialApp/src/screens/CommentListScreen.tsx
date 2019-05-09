import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Post } from "../models/post";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  FlatList,
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
  list: {
    flex: 1,
  },
  cellContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  commentName: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 5,
  },
  commentEmail: {
    fontSize: 14,
    color: "#4974a2",
    flex: 1,
    paddingBottom: 15,
  },
  commentBody: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
    paddingBottom: 10,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    height: 1,
    flex: 1,
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

function CommentViewCell(props: { comment: Comment }) {
  return (
    <>
      <View style={styles.cellContainer}>
        <Text style={styles.commentName}>{props.comment.name}</Text>
        <Text style={styles.commentEmail}>{props.comment.email}</Text>
        <Text style={styles.commentBody}>{props.comment.body}</Text>
      </View>
      <View style={styles.separator} />
    </>
  );
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

  keyExtractor = (item: Comment) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: Comment }) => {
    return <CommentViewCell comment={item} />;
  };

  render() {
    const { comments } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={comments}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListScreen);
