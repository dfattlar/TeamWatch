import moment from 'moment';
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    ScrollView
} from 'react-native';
import AthleteRow from './athleteRow';

const styles = StyleSheet.create({
    athleteListView: {}
});

export default class AthleteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { watcher, addSplit } = this.props;

        return (
            <ListView
             dataSource={watcher.dataSource}
             style={styles.athleteListView}
             enableEmptySections={true}
             renderRow={function(rowData) {
                 return (<AthleteRow rowData={rowData} addSplit={addSplit}/>);
             }}
            />
        );
    }
}
