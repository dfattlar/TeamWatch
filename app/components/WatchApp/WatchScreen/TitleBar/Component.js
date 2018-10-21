"use strict";

import React from "react";
import { View, Text } from "react-native";

import styles from "./Styles";

const TitleBarComponent = () => (
  <View style={styles.toolbar}>
    <View style={styles.buttonContainer} />
    <View style={styles.toolbarTitleContainer}>
      <Text style={styles.toolbarTitle}>TeamWatch</Text>
    </View>
    <View style={styles.buttonContainer} /> /*replace with SaveEventButton */
  </View>
);

export default TitleBarComponent;
