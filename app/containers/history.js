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

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1
    }
});

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
                <View style={styles.container}>
                    <Text>
                        Click Save on the Watch tab to save an item to your history.
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
