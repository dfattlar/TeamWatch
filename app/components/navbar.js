import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'transparent',
        flex: 1,
        flexDirection:'row',
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    toolbarTitleContainer: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    toolbarButtonText:{
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        fontSize: 24,
        fontWeight: '300',
        textAlign: 'center'
    },
    addPersonIcon: {
        width: 25,
        height: 25,
        marginRight: 15
    }
});

export default class Navbar extends Component {
  render() {
    const { openModal } = this.props;

    return (
        <View style={styles.toolbar}>
            <View style={styles.buttonContainer}></View>
            <View style={styles.toolbarTitleContainer}>
                <Text style={styles.toolbarTitle}>TeamWatch</Text>
            </View>
            <View style={styles.buttonContainer}>
            </View>
        </View>
    );
  }
}
