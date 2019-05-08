import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { User } from "../models/user";
import { ReduxState, Dispatch } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchTodosByUser } from "../redux/actions/todo";
import { selectTodos } from "../redux/reducers/todo";
import { connect } from "react-redux";
import { Todo } from "../models/todo";

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
  todos: Todo[];
}

type Props = NavigationScreenProps<RouteProps> &
  MapProps &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  user: User;
}

function mapStateToProps(state: ReduxState) {
  return {
    todos: selectTodos(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    todoAction: bindActionCreators({ fetchTodosByUser }, dispatch),
  };
}

class TodoListScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: <Text style={styles.title}>Todos</Text>,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      user: props.navigation.getParam("user"),
    };
  }

  componentDidMount() {
    this.props.todoAction.fetchTodosByUser(this.state.user);
  }

  render() {
    return <View style={styles.rootContainer} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListScreen);
