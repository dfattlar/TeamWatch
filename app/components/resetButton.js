import React, {
  StyleSheet,
  Component,
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

export default class ResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watcher, resetAll, resetTime, resetAthleteList } = this.props;

    return (
        <TouchableHighlight underlayColor="gray"
          style={[styles.button]}
          underlayColor="lightgray"
          onPress={() => Alert.alert(
            'What would you like to reset?',
            null,
            [
                {text: 'Reset Time And Splits Only', onPress: () => {
                        clearInterval(watcher.get('intervalId'));
                        resetTime();
                    }
                },
                {text: 'Reset Time and Athletes', onPress: () => {
                        clearInterval(watcher.get('intervalId'));
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
