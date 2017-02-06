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

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1
    }
});

class AddAthlete extends Component {
    constructor(props) {
        super(props);
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
                    <Text style={styles.modalLabel}>Add the athletes first and last name: </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
                        onChangeText={(text) => actions.newAthleteInput(text)}
                        value={state.newAthleteInput}
                    />
                    <Text style={[styles.errorTextHidden, state.addAthleteError && styles.errorText]}>
                        Please add athletes first and last name.
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
        state: state.addAthlete
    }),
    (dispatch) => ({
        actions: bindActionCreators(athleteActions, dispatch)
    })
)(AddAthlete);
