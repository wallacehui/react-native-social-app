import * as React from "react";
import { Album } from "../models/album";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  FlatList,
} from "react-navigation";
import { StyleSheet, View, Text, Image, RefreshControl } from "react-native";
import { ReduxState, Dispatch } from "../redux/store";
import { bindActionCreators } from "redux";
import {
  fetchPhotosByAlbum,
  refreshPhotosByAlbum,
} from "../redux/actions/photo";
import { connect } from "react-redux";
import { selectPhotos, selectPhotosFetchState } from "../redux/reducers/photo";
import { Photo } from "../models/photo";
import { PaingationStatus } from "../redux/reducers/paginator";

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
    flex: 1,
    alignItems: "center",
  },
  photoTitle: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
    paddingHorizontal: 10,
  },
  photoImage: {
    width: 60,
    height: 60,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    marginLeft: 15,
    height: 1,
    flex: 1,
  },
});

function mapStateToProps(state: ReduxState) {
  return {
    photos: selectPhotos(state),
    fetchStatus: selectPhotosFetchState(state).status,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    photoAction: bindActionCreators(
      { fetchPhotosByAlbum, refreshPhotosByAlbum },
      dispatch
    ),
  };
}

export interface RouteProps {
  album: Album;
}

interface MapProps {
  photos: Photo[];
  fetchStatus: PaingationStatus;
}

type Props = NavigationScreenProps<RouteProps> &
  ReturnType<typeof mapDispatchToProps> &
  MapProps;

interface State {
  album: Album;
}

function PhotoViewCell(props: { photo: Photo }) {
  return (
    <>
      <View style={styles.cellContainer}>
        <Image
          style={styles.photoImage}
          source={{ uri: props.photo.thumbnailUrl }}
        />
        <Text style={styles.photoTitle}>{props.photo.title}</Text>
      </View>
      <View style={styles.separator} />
    </>
  );
}

class PhotoListScreen extends React.PureComponent<Props, State> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<RouteProps>): NavigationScreenOptions => ({
    headerTitle: (
      <Text style={styles.title}>{navigation.getParam("album").title}</Text>
    ),
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      album: props.navigation.getParam("album"),
    };
  }

  componentDidMount() {
    this.props.photoAction.refreshPhotosByAlbum(this.state.album);
  }

  keyExtractor = (item: Photo) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: Photo }) => {
    return <PhotoViewCell photo={item} />;
  };

  onRefresh = () => {
    this.props.photoAction.refreshPhotosByAlbum(this.state.album);
  };

  onEndReached = (info: { distanceFromEnd: number }) => {
    this.props.photoAction.fetchPhotosByAlbum(this.state.album);
  };

  render() {
    const { fetchStatus, photos } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          style={styles.list}
          data={photos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={fetchStatus == "WillRefresh"}
              onRefresh={this.onRefresh}
            />
          }
          refreshing={fetchStatus == "WillRefresh"}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoListScreen);
