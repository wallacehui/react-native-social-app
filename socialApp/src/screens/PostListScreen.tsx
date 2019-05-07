import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
  },
  dummyTitle: {
    textAlign: "center",
    color: "#333333",
  },
});

export default class PostListScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.dummyTitle}>Post list screen</Text>
      </View>
    );
  }
}
