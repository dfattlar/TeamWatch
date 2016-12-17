import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, .6)'
    },
    innerContainer: {
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20
    },
    modalLabel: {
      fontSize: 16,
      paddingBottom: 20
    },
    modalButton: {
      marginTop: 10,
    },
    modalClose: {
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 6,
      height: 40,
      width: 80,
      position: 'absolute',
      top: 40,
      right: 20
    },
    modalCloseText: {
      color: 'white',
      textAlign: 'center',
      paddingTop: 10
    },
    modalSaveButton: {
      marginTop: 10,
      borderWidth: 2,
      borderColor: '#433C3C',
      borderRadius: 6,
      height: 40,
      width: 120,
    },
    modalSaveButtonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 10
    },
    errorTextHidden: {
        color: 'white'
    },
    errorText: {
        color: 'red'
    }
});

export default class AddAthleteModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watcher, closeModal, newAthleteInput, addAthlete, addAthleteError } = this.props;

    function checkAthleteName() {
        if(watcher.newAthleteInput.trim() === '') {
            addAthleteError();
        } else {
            addAthlete();
        }
    }

    return (
            <Modal visible={watcher.modalVisible}>
              <View style={styles.modalContainer}>
                <TouchableHighlight
                  onPress={closeModal}
                  style={[styles.modalClose]}
                  underlayColor="#a9d9d4">
                    <Text style={styles.modalCloseText}>Close</Text>
                </TouchableHighlight>
                <View style={[styles.innerContainer]}>

                  <Text style={styles.modalLabel}>Add the athletes first and last name: </Text>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                    onChangeText={(text) => newAthleteInput(text)}
                    value={watcher.newAthleteInput}
                  />
                  <Text style={[styles.errorTextHidden, watcher.addAthleteError && styles.errorText]}>
                    Please add athlete's first and last name.
                  </Text>

                  <TouchableHighlight
                    onPress={checkAthleteName}
                    style={[styles.modalSaveButton, this.props.style]}
                    underlayColor="#a9d9d4">
                      <Text style={styles.modalSaveButtonText}>Add Athlete</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
        );
    }
}
