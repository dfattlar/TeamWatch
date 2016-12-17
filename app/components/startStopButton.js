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

export default class StartStopButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watcher, startWatch, stopWatch, tick } = this.props;
    let depStyle = watcher.watchRunning ? styles.stopButton : styles.startButton;

    function callStartStop () {
        const watchRunning = watcher.watchRunning;
        if(watchRunning) {
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
              underlayColor="gray"
              onPress={callStartStop}
              style = {[styles.button, depStyle]}
            >
              <Text style={[styles.buttonText]}>
                {watcher.watchRunning ? 'STOP' : 'START'}
              </Text>
            </TouchableHighlight>
        </View>
    );
  }
}
