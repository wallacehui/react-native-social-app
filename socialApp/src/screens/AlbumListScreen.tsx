import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  FlatList,
} from "react-navigation";
import { User } from "../models/user";
import { ReduxState, Dispatch } from "../redux/store";
import { selectalbums } from "../redux/reducers/album";
import { bindActionCreators } from "redux";
import { fetchalbumsByUser } from "../redux/actions/album";
import { connect } from "react-redux";
import { Album } from "../models/album";
import { TouchableOpacity } from "react-native-gesture-handler";
import { makePhotoListScreenRoute } from "../routeMaker";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
  albumCellContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumTitle: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
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

interface State {
  user: User;
}

interface MapProps {
  albums: Album[];
}

type Props = NavigationScreenProps<RouteProps> &
  MapProps &
  ReturnType<typeof mapDispatchToProps>;

function mapStateToProps(state: ReduxState) {
  return {
    albums: selectalbums(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    albumAction: bindActionCreators({ fetchalbumsByUser }, dispatch),
  };
}

function AlbumViewCell(props: { album: Album; onPress: () => void }) {
  return (
    <>
      <TouchableOpacity
        style={styles.albumCellContainer}
        onPress={props.onPress}
      >
        <Text style={styles.albumTitle}>{props.album.title}</Text>
        <Image
          style={styles.rightArrow}
          source={require("../resources/images/navigation_right_arrow.png")}
        />
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );
}

class AlbumListScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Albums</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      user: props.navigation.getParam("user"),
    };
  }

  componentDidMount() {
    this.props.albumAction.fetchalbumsByUser(this.state.user);
  }

  onPressAlbum = (album: Album) => {
    const [routeName, routeProps] = makePhotoListScreenRoute({
      album: album,
    });
    this.props.navigation.navigate({
      routeName,
      params: routeProps,
    });
  };

  keyExtractor = (item: Album) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: Album }) => {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <AlbumViewCell album={item} onPress={() => this.onPressAlbum(item)} />
    );
  };

  render() {
    const { albums } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={albums}
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
)(AlbumListScreen);
