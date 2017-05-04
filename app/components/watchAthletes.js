'use strict';

import moment from 'moment';
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    ScrollView,
    View,
    Text
} from 'react-native';
import WatchAthleteRow from './watchAthleteRow';

export default class WatchAthletes extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.watch.athletesArray),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.watch.athletesArray)
        })
    }

    render() {
        const { watch, addSplit } = this.props;
debugger;
        if(!watch.athletesArray.length) {
            return (
                <View style={styles.noAthContainer}>
                    <Text style={styles.noAthTitle}>Add Athletes to the Watch</Text>
                    <Text style={styles.noAthText}>Tap the Athletes tab below. Then create an athlete or tap the cirlce next to their name to add them to the watch.</Text>
                </View>
            )
        }
        return (
            <ListView
             dataSource={this.state.dataSource}
             style={styles.athleteListView}
             enableEmptySections={true}
             renderRow={function(rowData) {
                 return (<WatchAthleteRow rowData={rowData} addSplit={addSplit} routeParent={{routeParent:'watch'}}/>);
             }}
            />
        );
    }
}

const styles = StyleSheet.create({
    athleteListView: {},
    noAthContainer: {
        flex: 1,
        alignItems: 'center'
    },
    noAthTitle: {
        fontSize: 24,
        fontWeight: '200',
        marginTop: 15
    },
    noAthText: {
        fontSize: 16,
        fontWeight: '200',
        margin: 20
    }
});
