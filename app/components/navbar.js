import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    toolbarTitleContainer: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    toolbarButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
        textAlign: 'center'
    },
    saveText: {
        fontSize: 18,
        color: '#fff'
    }
});

export default class Navbar extends Component {
    render() {
        const { addHistory, watcher } = this.props;

        return (
            <View style={styles.toolbar}>
                <View style={styles.buttonContainer}></View>
                <View style={styles.toolbarTitleContainer}>
                    <Text style={styles.toolbarTitle}>TeamWatch</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                      underlayColor="lightgray"
                      onPress={addHistory({
                          athletesArray: watcher.athletesArray,
                          relayFinishTime: watcher.relayFinishTime,
                          startTime: watcher.startTime
                      })}
                    >
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
