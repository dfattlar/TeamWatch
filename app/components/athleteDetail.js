import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput
} from "react-native";

const styles = StyleSheet.create({
  athlete: {
    marginTop: 60,
    flex: 1
  }
});

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
