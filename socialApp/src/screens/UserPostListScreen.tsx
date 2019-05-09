import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
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
import { FlatList } from "react-native-gesture-handler";

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
    flexDirection: "row",
    alignItems: "center",
  },
  postColumn: {
    flexDirection: "column",
    paddingHorizontal: 15,
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    fontWeight: "600",
    paddingVertical: 10,
  },
  postBody: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
    paddingBottom: 10,
  },
  rightArrow: {
    width: 30,
    height: 30,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    height: 1,
    flex: 1,
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

function PostViewCell(props: { post: Post; onPress: () => void }) {
  return (
    <>
      <TouchableOpacity style={styles.cellContainer} onPress={props.onPress}>
        <View style={styles.postColumn}>
          <Text style={styles.postTitle} numberOfLines={1} ellipsizeMode="tail">
            {props.post.title}
          </Text>
          <Text style={styles.postBody} numberOfLines={2} ellipsizeMode="tail">
            {props.post.body}
          </Text>
        </View>
        <Image
          style={styles.rightArrow}
          source={require("../resources/images/navigation_right_arrow.png")}
        />
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );
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

  keyExtractor = (item: Post) => {
    return item.id.toString();
  };

  onPressPost = (post: Post) => {
    // TODO: Navigate to comment list page
  };

  renderItem = ({ item }: { item: Post }) => {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <PostViewCell post={item} onPress={() => this.onPressPost(item)} />
    );
  };

  render() {
    const { posts } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={posts}
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
)(UserPostListScreen);
