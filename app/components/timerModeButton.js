'use strict';

import { RACE, RELAY } from '../constants';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        height: 45,
        width: 80,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        marginTop: 24
    },
    buttonText: {
        color: 'white'
    }
});

let intervalId;

export default class TimeModeButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { watch, modeChange } = this.props;
        let depStyle = watch.timerMode ? styles.stopButton : styles.startButton;

        function callModeChange() {
            const timerMode = watch.timerMode;
            if (timerMode === RACE) {
                modeChange(RELAY);
            } else {
                modeChange(RACE);
            }
        }

        return (
            <View>
                <TouchableHighlight
                  underlayColor="gray"
                  onPress={callModeChange}
                  style = {styles.button}
                >
                    <Text style={[styles.buttonText]}>
                        {watch.timerMode === RACE ? RACE : RELAY}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
