'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';
import Navbar from './navbar';

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        height: 40,
        width: 100,
        borderRadius: 20,
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

export default class ResetButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { watch, resetAll, resetTime, resetAthleteList } = this.props;

        return (
            <TouchableHighlight underlayColor="gray"
              style={[styles.button]}
              underlayColor="lightgray"
              onPress={() => Alert.alert(
                'What would you like to reset?',
                null,
                [
                    {text: 'Reset Time And Splits Only', onPress: () => {
                            clearInterval(watch.intervalId);
                            resetTime();
                        }
                    },
                    {text: 'Reset Time and Athletes', onPress: () => {
                            clearInterval(watch.intervalId);
                            resetAll();
                            resetAthleteList();
                        }
                    },
                    {text: 'Cancel', onPress: () => console.log('cancelled')}
                ]
              )}>
                <Text style={[styles.buttonText]}>
                    RESET
                </Text>
            </TouchableHighlight>
        );
    }
}
