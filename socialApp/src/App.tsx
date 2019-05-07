import React, { Component } from "react";
import { AppNavigator } from "./navigator";
import { makeStore } from "./redux/store";
import { Provider } from "react-redux";

const store = makeStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
