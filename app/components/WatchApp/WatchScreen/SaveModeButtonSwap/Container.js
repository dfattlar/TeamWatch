import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SaveModeButtonSwapComponent from './Component';

const SaveModeButtonSwapContainer = ({watchRunning, startTime}) => (
  <SaveModeButtonSwapComponent
    startTime={startTime}
    watchRunning={watchRunning}
  />
);

const mapStateToProps = state => ({
  startTime: state.watch.startTime,
  watchRunning: state.watch.watchRunning,
});

const mapDispatchToProps = {};

SaveModeButtonSwapContainer.propTypes = {
  startTime: PropTypes.number,
  watchRunning: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveModeButtonSwapContainer);
