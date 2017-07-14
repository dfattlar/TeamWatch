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

const styles = StyleSheet.create({
    athleteRow: {
        height: 80,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    rowBorder: {
        flex: 13,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    athleteNameContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    athleteRowName: {
        height: 60,
        width: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    athleteRowNameText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '300'
    },
    splits: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 6,
        paddingLeft: 10,
        height: 20
    },
    split: {
        paddingRight: 10,
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: '300'
    },
    rowButton: {
        height: 60,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowButtonText: {
        color: '#fff'
    },
    totalTimeContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalTime: {
        color: '#433C3C',
        fontSize: 24
    }
});

export default class HistoryRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {  startTime, name } = this.props.rowData
        const historyData = this.props.rowData

        function goToHistoryDetail() {
            Actions.historyDetail(historyData)
        }

        return (
            <TouchableHighlight
            onPress={goToHistoryDetail}>
                <View style={styles.athleteRow} /*key={id}*/>
                    <View style={styles.rowBorder}>
                        <View style={styles.totalTimeContainer}>
                            <Text style={styles.totalTime}>
                                { name ? name : formatSplit(startTime) }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

function formatSplit(split, endTime) {
    return moment(split).format('MMM Do - hh:mm:ss A');
}
