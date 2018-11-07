import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WatchAthleteRowComponent from "./Component";

import { addSplit } from "../../../../../store/watch";

const WatchAthleteRowContainer = props => (
  <WatchAthleteRowComponent
    item={props.item}
    watchRunning={props.watchRunning}
    addSplit={props.addSplit}
  />
);

const mapStateToProps = state => {
  return {
    watchRunning: state.watch.watchRunning
  };
};

const mapDispatchToProps = {
  addSplit
};

WatchAthleteRowContainer.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  addSplit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WatchAthleteRowContainer
);
