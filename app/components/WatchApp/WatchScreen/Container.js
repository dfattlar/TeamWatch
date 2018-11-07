"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WatchScreenComponent from "./Component";

const WatchScreenContainer = props => (
  <WatchScreenComponent
    timerMode={props.timerMode}
    relayFinishTime={props.relayFinishTime}
  />
);

const mapStateToProps = state => {
  return {
    timerMode: state.watch.timerMode,
    relayFinishTime: state.watch.relayFinishTime
  };
};

const mapDispatchToProps = {};

WatchScreenContainer.propTypes = {
  timerMode: PropTypes.string.isRequired,
  relayFinishTime: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WatchScreenContainer
);
