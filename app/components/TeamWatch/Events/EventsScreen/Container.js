"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as eventActions from "../../../../actions/eventActions";
import * as constants from "../../../../constants.js";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import EventRow from "./EventRow";
import { SwipeListView } from "react-native-swipe-list-view";

import { View, Text, ListView, TouchableHighlight, Alert } from "react-native";

import styles from "./Styles";

class Events extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.state.event.eventStore)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.state.event.eventStore)
    });
  }
  render() {
    const { state, actions } = this.props;
    const store = state.event.eventStore;

    function deleteEventConfirm(id) {
      Alert.alert(
        "Delete Event",
        "Are you sure you want to delete this Race?",
        [
          { text: "Cancel", onPress: () => {} },
          { text: "OK", onPress: () => actions.deleteEvent(id) }
        ]
      );
    }

    if (store.length) {
      return (
        <View style={styles.container}>
          <SwipeListView
            dataSource={this.state.dataSource}
            renderRow={function(rowData) {
              return <EventRow rowData={rowData} />;
            }}
            renderHiddenRow={(data, secId, rowId, rowMap) => (
              <TouchableHighlight
                style={styles.rowBack}
                onPress={() => {
                  rowMap[`${secId}${rowId}`].closeRow();
                  deleteEventConfirm(data.id);
                }}
              >
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
        <View style={[styles.container, styles.noEventContainer]}>
          <Text style={styles.noEventTitle}>No Event Saved Yet</Text>
          <Text style={styles.noEventText}>
            Tap 'Save' on the top right of the Watch tab to save an item to your
            event.
          </Text>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
