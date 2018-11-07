import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addEvent } from "../../../../store/events";

import SaveEventButtonComponent from "./Component";

const SaveEventButtonContainer = props => (
  <SaveEventButtonComponent
    addEvent={props.addEvent}
    athletesOnWatch={props.athletesOnWatch}
    relayFinishTime={props.relayFinishTime}
    timerMode={props.timerMode}
    startTime={props.startTime}
    watchStop={props.watchStop}
  />
);

const mapStateToProps = state => ({
  athletesOnWatch: state.watch.athletesOnWatch,
  relayFinishTime: state.watch.relayFinishTime,
  timerMode: state.watch.timerMode,
  startTime: state.watch.startTime,
  watchStop: state.watch.watchStop
});

const mapDispatchToProps = {
  addEvent
};

SaveEventButtonContainer.propTypes = {
  addEvent: PropTypes.func.isRequired,
  athletesOnWatch: PropTypes.array.isRequired,
  relayFinishTime: PropTypes.number.isRequired,
  timerMode: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  watchStop: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SaveEventButtonContainer
);
