'use strict';

import moment from 'moment';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ListView
} from 'react-native';

const athleteColors = ['#51EC91', '#433C3C', '#91897D', '#8AF4B6', '#90AABF'];

const styles = StyleSheet.create({
    athleteRow: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    athleteAddButton: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: 'black'
    },
    onWatch: {
        backgroundColor: 'black'
    },
    notOnWatch: {
        backgroundColor: 'white'
    },
    athleteRowNameText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '300'
    },
    buttonContainer: {
        flex: 1,
        paddingLeft: 10
    },
    nameContainer: {
        flex: 7
    }
});

export default class AthleteStoreRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {  name, id, onWatch } = this.props.rowData;
        const { addAthleteToWatch, removeAthleteFromWatch } = this.props.actions;

        let depStyle = onWatch ? styles.onWatch : styles.notOnWatch;

        function addAthleteCheck() {
            if (!onWatch) {
                addAthleteToWatch(id, name)
            } else {
                removeAthleteFromWatch(id);
            }
        }

        return (
            <TouchableHighlight
                onPress={addAthleteCheck}
                key={id}
            >
                <View style={[styles.athleteRow]}>
                    <View style={styles.buttonContainer}>
                        <View style={[styles.athleteAddButton, depStyle]}>
                        </View>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.athleteRowNameText}>
                            {name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
