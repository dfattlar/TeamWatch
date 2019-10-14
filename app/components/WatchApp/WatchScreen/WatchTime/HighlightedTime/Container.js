import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import HighlightedTimeComponent from './Component';

const HighlightedTimeContainer = ({relayFinishTime, timerMode, bestTime}) => (
  <HighlightedTimeComponent
    relayFinishTime={relayFinishTime}
    timerMode={timerMode}
    bestTime={bestTime}
  />
);

const mapStateToProps = state => {
  debugger;
  return {
    relayFinishTime: state.watch.relayFinishTime,
    timerMode: state.watch.timerMode,
    bestTime: state.watch.bestTime,
  };
};

const mapDispatchToProps = {};

HighlightedTimeContainer.propTypes = {
  relayFinishTime: PropTypes.number.isRequired,
  timerMode: PropTypes.string.isRequired,
  bestTime: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HighlightedTimeContainer);
