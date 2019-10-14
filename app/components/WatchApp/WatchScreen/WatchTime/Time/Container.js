import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TimeComponent from './Component';

const TimeContainer = ({startTime, watchRunning, watchReset}) => {
  return (
    <TimeComponent
      startTime={startTime}
      watchRunning={watchRunning}
      watchReset={watchReset}
    />
  );
};

const mapStateToProps = state => {
  return {
    watchRunning: state.watch.watchRunning,
    startTime: state.watch.startTime,
    watchReset: state.watch.watchReset,
  };
};

const mapDispatchToProps = {};

TimeContainer.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  startTime: PropTypes.number,
  watchReset: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeContainer);
