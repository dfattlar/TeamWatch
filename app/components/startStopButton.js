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
        borderWidth: 2,
        height: 90,
        width: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '200'
    },
    startButton: {
        borderColor: '#51EC91'
    },
    stopButton: {
        borderColor: '#433C3C'
    }
});

let intervalId;

export default class StartStopButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { watch, startWatch, stopWatch, tick } = this.props;
        let depStyle = watch.watchRunning ? styles.stopButton : styles.startButton;

        function callStartStop() {
            const watchRunning = watch.watchRunning;
            if (watchRunning) {
                clearInterval(intervalId);
                stopWatch();
            } else {
                intervalId = setInterval(() => {
                    tick();
                });
                startWatch(intervalId);
            }
        }

        return (
            <View>
                <TouchableHighlight
                  underlayColor="lightgray"
                  onPress={callStartStop}
                  style = {[styles.button, depStyle]}
                >
                    <Text style={[styles.buttonText]}>
                        {watch.watchRunning ? 'STOP' : 'START'}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
