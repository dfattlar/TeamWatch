"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as athleteActions from "../actions/athleteActions";
import * as constants from "../constants.js";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import AthleteRow from "../components/athleteRow";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  StatusBar,
  ListView,
  Alert
} from "react-native";

class AthleteStore extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.state.athlete.athleteStore)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.state.athlete.athleteStore)
    });
  }

  render() {
    const { state, actions } = this.props;
    const store = state.athlete.athleteStore;

    function deleteAthleteConfirm(id) {
      Alert.alert(
        "Delete Athlete",
        "Are you sure you want to delete this Athlete and their records?",
        [
          { text: "Cancel", onPress: () => {} },
          { text: "OK", onPress: () => actions.deleteAthlete(id) }
        ]
      );
    }

    if (store.length) {
      return (
        <View style={styles.container}>
          <SwipeListView
            dataSource={this.state.dataSource}
            renderRow={function(rowData) {
              return <AthleteRow rowData={rowData} actions={actions} />;
            }}
            renderHiddenRow={(data, secId, rowId, rowMap) => (
              <TouchableHighlight
                style={styles.rowBack}
                onPress={() => {
                  rowMap[`${secId}${rowId}`].closeRow();
                  deleteAthleteConfirm(data.id);
                }}
              >
                <Text>Delete</Text>
              </TouchableHighlight>
            )}
            disableRightSwipe={true}
            rightOpenValue={-75}
            style={styles.athleteListView}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.noAthContainer]}>
          <Text style={styles.noAthTitle}>Add An Athlete</Text>
          <Text onPress={Actions.newAthlete} style={styles.noAthText}>
            Tap the '+Add' button above to create an athlete.
          </Text>
        </View>
      );
    }
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    actions: bindActionCreators(athleteActions, dispatch)
  })
)(AthleteStore);

// style the react component
var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    marginBottom: 50
  },
  noAthContainer: {
    alignItems: "center"
  },
  noAthTitle: {
    fontSize: 24,
    fontWeight: "200",
    marginTop: 15
  },
  noAthText: {
    fontSize: 16,
    fontWeight: "200",
    margin: 20
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15
  }
});
