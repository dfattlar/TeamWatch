"use strict";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_CONTAINER
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: COLORS.FONT_MEDIUM,
    marginBottom: 5
  }
});

export default class TabView extends React.Component {
  render() {
    const drawer = this.context.drawer;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Tab {this.props.title}</Text>
      </View>
    );
  }
}

TabView.contextTypes = {
  drawer: PropTypes.object
};
