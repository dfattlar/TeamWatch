import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TimerComponent from "./Component";

class TimerContainer extends Component {
  render() {
    return <TimerComponent time={this.props.time} />;
  }
}

const mapStateToProps = state => {
  return {
    time: state.watch.time
  };
};

const mapDispatchToProps = {};

TimerContainer.propTypes = {
  time: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
