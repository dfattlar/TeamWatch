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
    const { watcher, reset } = this.props;

    return (
        <TouchableHighlight underlayColor="gray"
          style={[styles.button]}
          onPress={() => Alert.alert(
            'Are you sure you want to reset running time and athletes?',
            null,
            [
              {text: 'OK', onPress: () => reset()},
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
