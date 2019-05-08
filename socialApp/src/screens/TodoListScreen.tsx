import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  FlatList,
} from "react-navigation";
import { User } from "../models/user";
import { ReduxState, Dispatch } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchTodosByUser } from "../redux/actions/todo";
import { selectTodos } from "../redux/reducers/todo";
import { connect } from "react-redux";
import { Todo } from "../models/todo";
import { todoListResponseSchema } from "../models/api/todo";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
  cellContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  todoTitle: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    marginLeft: 15,
    height: 1,
    flex: 1,
  },
  checkIcon: {
    width: 30,
    height: 30,
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

function TodoViewCell(props: { todo: Todo }) {
  const source = props.todo.completed
    ? require("../resources/images/todo_check.png")
    : require("../resources/images/todo_uncheck.png");
  return (
    <>
      <View style={styles.cellContainer}>
        <Text style={styles.todoTitle}>{props.todo.title}</Text>
        <Image style={styles.checkIcon} source={source} />
      </View>
      <View style={styles.separator} />
    </>
  );
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

  keyExtractor = (item: Todo) => {
    return item.id.toString();
  };

  renderItem = ({ item }: { item: Todo }) => {
    return <TodoViewCell todo={item} />;
  };

  render() {
    const { todos } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={todos}
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
)(TodoListScreen);
