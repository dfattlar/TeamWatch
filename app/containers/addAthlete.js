'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as athleteActions from '../actions/athleteActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    StatusBar
} from 'react-native';

class AddAthlete extends Component {
    constructor(props) {
        super(props);
        props.state.addAthleteError = false;
    }

    render() {
        const { state, actions } = this.props;

        function checkAthleteName() {
            if (state.newAthleteInput.trim() === '') {
                actions.addAthleteError();
            } else {
                actions.addAthlete();
            }
        }

        return (
            <View style={styles.container}>
                <View style={[styles.innerContainer]}>
                    <Text style={styles.formText}>Add the athlete's first and last name: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                        onChangeText={(text) => actions.newAthleteInput(text)}
                        value={state.newAthleteInput}
                    />
                    <Text style={[styles.formText, styles.errorTextHidden, state.addAthleteError && styles.errorText,]}>
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
        );
    }
}

export default connect(state => ({
        state: state.athlete
    }),
    (dispatch) => ({
        actions: bindActionCreators(athleteActions, dispatch)
    })
)(AddAthlete);

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 64,
        flex: 1,
        alignItems: 'center'
    },
    formText: {
        fontSize: 16,
        fontWeight: '200',
        margin: 20
    },
    errorTextHidden: {
        marginTop: 5,
        color: '#fff'
    },
    errorText: {
        color: 'red'
    },
    modalSaveButton: {
        backgroundColor: '#90aabf',
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#433c3c'
    },
    modalSaveButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        marginTop: 6
    }
});
