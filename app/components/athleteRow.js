'use strict';

import moment from 'moment';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux'

const athleteColors = ['#51EC91', '#433C3C', '#91897D', '#8AF4B6', '#90AABF'];

const styles = StyleSheet.create({
    athleteRow: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
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

export default class AthleteRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {  name, id, onWatch } = this.props.rowData;
        const athleteData = this.props.rowData;
        const { addAthleteToWatch, removeAthleteFromWatch,  } = this.props.actions;

        let depStyle = onWatch ? styles.onWatch : styles.notOnWatch;

        function addAthleteCheck() {
            if (!onWatch) {
                addAthleteToWatch(id, name)
            } else {
                removeAthleteFromWatch(id);
            }
        }

        function athleteDetail() {
            Actions.athleteDetail(athleteData);
        }

        return (
            <View key={id}>
                <View style={[styles.athleteRow]}>
                    <TouchableHighlight
                        onPress={addAthleteCheck}
                    >
                        <View style={styles.buttonContainer}>
                            <View style={[styles.athleteAddButton, depStyle]}>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={athleteDetail}
                    >
                        <View style={styles.nameContainer}>
                            <Text style={styles.athleteRowNameText}>
                                {name}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
