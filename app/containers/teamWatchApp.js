'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import TeamWatch from '../components/teamWatch';
import * as teamWatchActions from '../actions/teamWatchActions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class TeamWatchApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <TeamWatch
        watcher={state.count}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.watcher
  }),
  (dispatch) => ({
    actions: bindActionCreators(teamWatchActions, dispatch)
  })
)(TeamWatchApp);
