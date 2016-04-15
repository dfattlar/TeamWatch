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
      borderWidth: 2,
      height: 55,
      width: 120,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

let intervalId;

export default class ResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watcher, resetAll, resetTime } = this.props;

    return (
        <TouchableHighlight underlayColor="gray"
          style={[styles.button]}
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
                    }
                },
                {text: 'Cancel', onPress: () => console.log('cancelled')}
            ]
          )}>
          <Text style={[styles.darkText]}>
            Reset
          </Text>
        </TouchableHighlight>
    );
  }
}
