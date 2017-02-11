'use strict';

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
        debugger;
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

        return (
            <ListView
             dataSource={this.state.dataSource}
             style={styles.athleteListView}
             enableEmptySections={true}
             renderRow={function(rowData) {
                 return (<AthleteRow rowData={rowData} addSplit={addSplit}/>);
             }}
            />
        );
    }
}
