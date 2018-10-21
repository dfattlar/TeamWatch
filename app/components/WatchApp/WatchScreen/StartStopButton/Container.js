import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  watchRunning,
  startWatch,
  stopWatch,
  tick
} from "../../../../store/watch";

import StartStopButtonComponent from "./Component";

class StartStopButtonContainer extends Component {
  render() {
    return (
      <StartStopButtonComponent
        watchRunning={this.props.watchRunning}
        startWatch={this.props.startWatch}
        stopWatch={this.props.stopWatch}
        tick={this.props.tick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    watchRunning: state.watch.watchRunning
  };
};

const mapDispatchToProps = {
  startWatch,
  stopWatch,
  tick
};

StartStopButtonContainer.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  startWatch: PropTypes.func.isRequired,
  stopWatch: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StartStopButtonContainer
);
