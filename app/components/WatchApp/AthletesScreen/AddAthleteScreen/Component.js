"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, TouchableHighlight } from "react-native";

import styles from "./Styles";

export default class AddAthleteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athleteInputError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: ""
    };

    this.checkAthleteName = () => {
      const { newAthleteInputFirst, newAthleteInputLast, user } = this.state;
      const { createAthlete, navigation } = this.props;

      if (
        newAthleteInputFirst.trim() === "" ||
        newAthleteInputLast.trim() === ""
      ) {
        this.setState({ athleteInputError: true });
      } else {
        this.setState({ athleteInputError: false });
        // Update local state
        createAthlete(newAthleteInputFirst, newAthleteInputLast);
        navigation.goBack();

        // Update database

        // const userId = user.currentUser.uid;
        // athletesRef
        //   .child(userId)
        //   .push()
        //   .set({
        //     FirstName: newAthleteInputFirst,
        //     LastName: newAthleteInputLast
        //   });
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.innerContainer]}>
          <Text style={styles.formText}>Add the athlete's name:</Text>
          <Text style={styles.formText}>First Name:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10
            }}
            onChangeText={text => this.setState({ newAthleteInputFirst: text })}
            value={this.state.newAthleteInputFirst}
          />
          <Text style={styles.formText}>Last Name:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10
            }}
            onChangeText={text => this.setState({ newAthleteInputLast: text })}
            value={this.state.newAthleteInputLast}
          />
          <Text
            style={[
              styles.formText,
              styles.errorTextHidden,
              this.state.athleteInputError && styles.errorText
            ]}
          >
            Please add athlete's first and last name.
          </Text>

          <TouchableHighlight
            onPress={this.checkAthleteName}
            style={styles.modalSaveButton}
            underlayColor="#a9d9d4"
          >
            <Text style={styles.modalSaveButtonText}>Add Athlete</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AddAthleteComponent.propTypes = {
  createAthlete: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};
