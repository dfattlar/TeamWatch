import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { modeChange } from "../../../../store/watch";

import TimerModeButtonComponent from "./Component";

class TimerModeButtonContainer extends Component {
  render() {
    return (
      <TimerModeButtonComponent
        timerMode={this.props.timerMode}
        modeChange={this.props.modeChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    timerMode: state.watch.timerMode
  };
};

const mapDispatchToProps = {
  modeChange
};

TimerModeButtonContainer.propTypes = {
  timerMode: PropTypes.string.isRequired,
  modeChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  TimerModeButtonContainer
);
