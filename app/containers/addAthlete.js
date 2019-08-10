"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as athleteActions from "../actions/athleteActions";
import { COLORS } from "../constants";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  StatusBar
} from "react-native";

class AddAthlete extends Component {
  constructor(props) {
    super(props);
    props.state.addAthleteError = false;
  }

  render() {
    const { state, actions } = this.props;

    function checkAthleteName() {
      if (state.newAthleteInput.trim() === "") {
        actions.addAthleteError();
      } else {
        actions.addAthlete();
        Actions.pop();
      }
    }

    return (
      <View style={styles.container}>
        <View style={[styles.innerContainer]}>
          <Text style={[styles.formText, styles.labelPadding]}>
            Add the athlete's first and last name:{" "}
          </Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={text => actions.newAthleteInput(text)}
            value={state.newAthleteInput}
          />
          <Text
            style={[
              styles.formText,
              styles.errorTextHidden,
              state.addAthleteError && styles.errorText
            ]}
          >
            Please add athlete's first and last name.
          </Text>

          <TouchableHighlight
            onPress={checkAthleteName}
            style={[styles.modalSaveButton, this.props.style]}
            underlayColor="#a9d9d4"
          >
            <Text style={styles.modalSaveButtonText}>Add Athlete</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.athlete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(athleteActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAthlete);

// style the react component
var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center"
  },
  formText: {
    fontSize: 18,
    fontWeight: "200",
    fontFamily: "GothamRounded-Medium",
    paddingLeft: 10
  },
  labelPadding: {
    paddingTop: 10,
    paddingBottom: 5
  },
  errorTextHidden: {
    marginTop: 5,
    color: COLORS.FONT_LIGHT,
    fontFamily: "GothamRounded-Medium",
    paddingLeft: 10
  },
  errorText: {
    color: "red"
  },
  modalSaveButton: {
    backgroundColor: COLORS.FONT_ERRROR,
    height: 40,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.BACKGROUND_LIGHT,
    marginRight: 10,
    marginLeft: 10
  },
  modalSaveButtonText: {
    color: COLORS.FONT_LIGHT,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 8,
    fontFamily: "GothamRounded-Medium"
  },
  nameInput: {
    height: 40,
    borderColor: COLORS.BACKGROUND_CONTAINER,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 6,
    marginRight: 10,
    marginLeft: 10
  },
  innerContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 6,
    paddingTop: 6,
    paddingBottom: 20,
    width: "100%"
  }
});
