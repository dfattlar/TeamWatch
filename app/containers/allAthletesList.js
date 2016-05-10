'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import * as athleteActions from '../actions/athleteActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';

const {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    StatusBar
} = React;

// style the react component
var styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1
    }
});

class AllAthletesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    debugger;

    return (
        <View>
            <Text style={styles.container} onPress={Actions.newAthlete}>
                No Athletes
            </Text>
        </View>
    );
  }
}

export default connect(state => ({
    state: state.addAthlete
  }),
  (dispatch) => ({
    actions: bindActionCreators(athleteActions, dispatch)
  })
)(AllAthletesList);
