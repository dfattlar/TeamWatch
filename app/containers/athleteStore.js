'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as athleteActions from '../actions/athleteActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AthleteStoreRow from '../components/athleteStoreRow';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    StatusBar,
    ListView
} from 'react-native';

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1
    }
});

class AthleteStore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    const store = state.addAthlete.get('athleteStore');

    if(store.size) {
        return (
            <View style={styles.container}>
                <ListView
                  dataSource={state.addAthlete.get('storeDataSource')}
                  style={styles.athleteListView}
                  renderRow={function(rowData) {
                      return (<AthleteStoreRow rowData={rowData} actions={actions} />);
                  } }
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text onPress={Actions.newAthlete}>
                    Click the + button to add athletes
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
    actions: bindActionCreators(athleteActions, dispatch)
  })
)(AthleteStore);
