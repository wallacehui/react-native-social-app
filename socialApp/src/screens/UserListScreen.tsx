import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dispatch, ReduxState } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../redux/actions/user";
import { connect } from "react-redux";
import { selectUsers } from "../redux/reducers/user";
import { User } from "../models/user";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
  dummyTitle: {
    textAlign: "center",
    color: "#333333",
  },
});

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

  render() {
    console.log("props data", this.props.users);
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.dummyTitle}>User list screen</Text>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListScreen);
