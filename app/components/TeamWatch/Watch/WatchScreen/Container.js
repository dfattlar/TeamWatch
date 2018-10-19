"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as watchActions from "../../../../actions/watchActions";
import { connect } from "react-redux";
import WatchComponent from "./Component";

class WatchContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WatchComponent actions={this.props.actions} state={this.props.state} />
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.watch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchContainer);
