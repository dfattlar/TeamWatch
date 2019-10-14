import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {watchRunning, startWatch, stopWatch} from '../../../../store/watch';

import StartStopButtonComponent from './Component';

const StartStopButtonContainer = props => (
  <StartStopButtonComponent
    watchRunning={props.watchRunning}
    startWatch={props.startWatch}
    stopWatch={props.stopWatch}
  />
);

const mapStateToProps = state => ({
  watchRunning: state.watch.watchRunning,
});

const mapDispatchToProps = {
  startWatch,
  stopWatch,
};

StartStopButtonContainer.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  startWatch: PropTypes.func.isRequired,
  stopWatch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartStopButtonContainer);
