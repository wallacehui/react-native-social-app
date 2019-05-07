import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dispatch, ReduxState } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../redux/actions/user";
import { connect } from "react-redux";
import { selectUsers } from "../redux/reducers/user";
import { User } from "../models/user";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  cellContainer: {
    flexDirection: "column",
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

function UserViewCell(props: { user: User }) {
  const { user } = props;
  return (
    <View style={styles.cellContainer}>
      <Text style={styles.userName}>{user.name}</Text>
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

type Props = MapProps & ReturnType<typeof mapDispatchToProps>;

export class UserListScreen extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.userAction.fetchUsers();
  }

  keyExtractor = (item: User) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: User }) => {
    return <UserViewCell user={item} />;
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
