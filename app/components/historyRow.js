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

const styles = StyleSheet.create({
    athleteRow: {
        height: 80,
        flex: 1,
        flexDirection: 'row'
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
        const {  startTime } = this.props.rowData[0];

        return (
            <View>
                <View style={styles.athleteRow} /*key={id}*/>
                    <View style={styles.rowBorder}>
                        <View style={styles.totalTimeContainer}>
                            <Text style={styles.totalTime}>
                                { formatSplit(startTime) }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

function formatSplit(split, endTime) {
    return moment(split).format('MMM Do - hh:mm:ss A');
}
