"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput
} from "react-native";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, .6)"
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    padding: 20
  },
  modalLabel: {
    fontSize: 18,
    fontFamily: "GothamRounded-Medium",
    paddingBottom: 20
  },
  modalButton: {
    marginTop: 10
  },
  modalClose: {
    borderWidth: 2,
    borderColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 6,
    height: 40,
    width: 80,
    position: "absolute",
    top: 40,
    right: 20
  },
  modalCloseText: {
    color: COLORS.FONT_LIGHT,
    textAlign: "center",
    paddingTop: 10
  },
  modalSaveButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: COLORS.NAV_BUTTON,
    borderRadius: 6,
    height: 40,
    width: 120
  },
  modalSaveButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10
  },
  errorTextHidden: {
    color: COLORS.FONT_LIGHT
  },
  errorText: {
    color: COLORS.FONT_ERRROR
  }
});

export default class AddAthleteModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      watch,
      closeModal,
      newAthleteInput,
      addAthlete,
      addAthleteError
    } = this.props;

    function checkAthleteName() {
      if (watch.newAthleteInput.trim() === "") {
        addAthleteError();
      } else {
        addAthlete();
      }
    }

    return (
      <Modal visible={watch.modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableHighlight
            onPress={closeModal}
            style={[styles.modalClose]}
            underlayColor={COLORS.BUTTON_UNDERLAY}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableHighlight>
          <View style={[styles.innerContainer]}>
            <Text style={styles.modalLabel}>
              Add the athletes first and last name:{" "}
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: COLORS.BACKGROUND_CONTAINER,
                borderWidth: 1,
                paddingLeft: 10
              }}
              onChangeText={text => newAthleteInput(text)}
              value={watch.newAthleteInput}
            />
            <Text
              style={[
                styles.errorTextHidden,
                watch.addAthleteError && styles.errorText
              ]}
            >
              Please add athlete's first and last name.
            </Text>

            <TouchableHighlight
              onPress={checkAthleteName}
              style={[styles.modalSaveButton, this.props.style]}
              underlayColor={COLORS.BUTTON_UNDERLAY}
            >
              <Text style={styles.modalSaveButtonText}>Add Athlete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
