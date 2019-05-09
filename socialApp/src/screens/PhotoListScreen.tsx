import * as React from "react";
import { Album } from "../models/album";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { StyleSheet, View, Text } from "react-native";
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

  render() {
    return <View style={styles.rootContainer} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoListScreen);
