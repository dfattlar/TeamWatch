'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as historyActions from '../actions/historyActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import HistoryRow from '../components/historyRow';

import {
    View,
    StyleSheet,
    Text,
    ListView
} from 'react-native';

class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions } = this.props;
        const store = state.history.historyStore;

        if(store.length) {
            return (
                <View style={styles.container}>
                    <ListView
                      dataSource={state.history.historyDS}
                      style={styles.athleteListView}
                      enableEmptySections={true}
                      renderRow={function(rowData) {
                          return (<HistoryRow rowData={rowData}/>);
                      } }
                    />
                </View>
            );
        } else {
            return (
                <View style={[styles.container, styles.noHistContainer]}>
                    <Text style={styles.noHistTitle}>No History Saved Yet</Text>
                    <Text style={styles.noHistText}>
                        Tap 'Save' on the top right of the Watch tab to save an item to your history.
                    </Text>
                </View>
            );
        }
    }
}

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(historyActions, dispatch)
    })
)(History);

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 64,
        flex: 1
    },
    noHistContainer: {
        alignItems: 'center'
    },
    noHistTitle: {
        fontSize: 24,
        fontWeight: '200',
        marginTop: 15
    },
    noHistText: {
        fontSize: 16,
        fontWeight: '200',
        margin: 20
    }
});
