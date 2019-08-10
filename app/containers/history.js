"use strict";

import React, { Component } from "react";
import { FlatList } from "react-native";
import { bindActionCreators } from "redux";
import * as historyActions from "../actions/historyActions";
import * as constants from "../constants.js";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import HistoryRow from "../components/historyRow";
import { COLORS } from "../constants";

import {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  Alert
} from "react-native";

class History extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { state, actions } = this.props;
    const store = state.history.historyStore;

    function deleteHistoryConfirm(id) {
      Alert.alert(
        "Delete History",
        "Are you sure you want to delete this Race?",
        [
          { text: "Cancel", onPress: () => {} },
          { text: "OK", onPress: () => actions.deleteHistory(id) }
        ]
      );
    }

    if (store.length) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.state.history.historyStore}
            renderItem={function(rowData) {
              return <HistoryRow rowData={rowData} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.noHistContainer]}>
          <Text style={styles.noHistTitle}>No History Saved Yet</Text>
          <Text style={styles.noHistText}>
            Tap 'Save' on the top right of the Watch tab to save an item to your
            history.
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
    actions: bindActionCreators(historyActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);

// style the react component
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noHistContainer: {
    alignItems: "center"
  },
  noHistTitle: {
    fontSize: 24,
    fontWeight: "200",
    marginTop: 15,
    fontFamily: "GothamRounded-Medium"
  },
  noHistText: {
    fontSize: 16,
    fontWeight: "200",
    margin: 20,
    fontFamily: "GothamRounded-Medium"
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_CONTAINER,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15
  },
  historyListView: {
    backgroundColor: COLORS.BACKGROUND_LIGHT
  }
});
