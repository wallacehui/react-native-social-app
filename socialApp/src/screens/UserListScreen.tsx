import * as React from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Dispatch, ReduxState } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../redux/actions/user";
import { connect } from "react-redux";
import { selectUsers } from "../redux/reducers/user";
import { User } from "../models/user";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  cellContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    color: "#333333",
    textAlign: "center",
  },
  userName: {
    fontSize: 22,
    color: "#333333",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    marginLeft: 15,
    height: 1,
    flex: 1,
  },
});

function UserViewCell(props: { onPress: () => void; user: User }) {
  const { user, onPress } = props;
  return (
    <View style={styles.cellContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.userName}>{user.name}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
}

function mapStateToProps(state: ReduxState) {
  return {
    users: selectUsers(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    userAction: bindActionCreators({ fetchUsers }, dispatch),
  };
}

interface MapProps {
  users: User[];
}

type Props = MapProps &
  ReturnType<typeof mapDispatchToProps> &
  NavigationScreenProps;

export class UserListScreen extends React.PureComponent<Props> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Friends</Text>,
  };

  componentDidMount() {
    this.props.userAction.fetchUsers();
  }

  onPressUser = (user: User) => {
    // TODO: navigate to user detail screen
    console.log("press", user);
  };

  keyExtractor = (item: User) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: User }) => {
    // tslint:disable-next-line:jsx-no-lambda
    return <UserViewCell onPress={() => this.onPressUser(item)} user={item} />;
  };

  render() {
    const { users } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={users}
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
)(UserListScreen);
