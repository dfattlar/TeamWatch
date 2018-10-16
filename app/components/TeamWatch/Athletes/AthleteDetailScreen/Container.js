import React, { Component } from "react";
import { View, Text, TouchableHighlight, Modal, TextInput } from "react-native";

import styles from "./Styles";

export default class AthleteDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id } = this.props;

    return (
      <View>
        <Text>Athlete!</Text>
        <Text>Athlete!</Text>
        <Text>Athlete!</Text>
        <Text>Athlete!</Text>
        <Text>Athlete!</Text>
        <Text>Athlete!</Text>
        <Text>{name}!</Text>
      </View>
    );
  }
}
