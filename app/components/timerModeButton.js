import * as constants from '../constants';
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    button: {
      borderWidth: 2,
      height: 55,
      width: 120,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    startButton: {
      borderColor: '#51EC91'
    },
    stopButton: {
      borderColor: '#433C3C'
    }
});

let intervalId;

export default class TimeModeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watcher, modeChange } = this.props;
    let depStyle = watcher.timerMode ? styles.stopButton : styles.startButton;

    function callModeChange () {
        const timerMode = watcher.timerMode;
        if(timerMode === constants.RACE) {
            modeChange(constants.RELAY);
        } else {
            modeChange(constants.RACE);
        }
    }

    return (
        <View>
            <TouchableHighlight
              underlayColor="gray"
              onPress={callModeChange}
              style = {[styles.button, depStyle]}
            >
              <Text style={[styles.buttonText]}>
                {watcher.timerMode === constants.RACE ? constants.RACE : constants.RELAY}
              </Text>
            </TouchableHighlight>
        </View>
    );
  }
}
