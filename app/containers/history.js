'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as historyActions from '../actions/historyActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import HistoryRow from '../components/historyRow';
import { SwipeListView } from 'react-native-swipe-list-view'

import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    Alert
} from 'react-native';

class History extends Component {
    constructor(props) {
        super(props);this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.state.history.historyStore)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.state.history.historyStore)
        })
    }
    render() {
        const { state, actions } = this.props;
        const store = state.history.historyStore;

        function deleteHistoryConfirm(id) {
            Alert.alert(
                'Delete History',
                'Are you sure you want to delete this Race?',
                [
                    {text: 'Cancel', onPress: () => {}},
                    {text: 'OK', onPress: () => actions.deleteHistory(id)},
                ]
            )
        }

        if(store.length) {
            return (
                <View style={styles.container}>
                    <SwipeListView
                        dataSource={this.state.dataSource}
                        renderRow={function(rowData) {
                            return (<HistoryRow rowData={rowData} />);
                        }}
                        renderHiddenRow={ (data, secId, rowId, rowMap) => (
                            <TouchableHighlight
                                style={styles.rowBack}
                                onPress={()=>{
                                    rowMap[`${secId}${rowId}`].closeRow()
                                    deleteHistoryConfirm(data.id)
                                }}>
                                <Text>Delete</Text>
                            </TouchableHighlight>
                        )}
                        enableEmptySections={true}
                        disableRightSwipe={true}
                        rightOpenValue={-75}
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
    },
    rowBack: {
        alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: 15
    },
    historyListView:  {
        backgroundColor: '#fff'
    }
});
