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
    const { watcher, modeChange } = this.props;
    let depStyle = watcher.get('timerMode') ? styles.stopButton : styles.startButton;

    function callModeChange () {
        const timerMode = watcher.get('timerMode');
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
              style = {styles.button}
            >
              <Text style={[styles.buttonText]}>
                {watcher.get('timerMode') === constants.RACE ? constants.RACE : constants.RELAY}
              </Text>
            </TouchableHighlight>
        </View>
    );
  }
}
