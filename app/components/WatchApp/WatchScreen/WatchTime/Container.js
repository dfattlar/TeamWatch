import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import WatchTimeComponent from './Component';

const WatchTimeContainer = ({watchRunning, startTime, stopTime}) => (
  <WatchTimeComponent
    showHighlight={watchRunning === false && startTime && stopTime}
    startTime={startTime}
  />
);

const mapStateToProps = state => {
  return {
    watchRunning: state.watch.watchRunning,
    startTime: state.watch.startTime,
    stopTime: state.watch.stopTime,
  };
};

const mapDispatchToProps = {};

WatchTimeContainer.propTypes = {
  startTime: PropTypes.number,
  stopTime: PropTypes.number,
  watchRunning: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WatchTimeContainer);
