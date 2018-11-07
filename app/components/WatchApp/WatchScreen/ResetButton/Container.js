import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { resetAll, resetTime } from "../../../../store/watch";
import { removeAllAthletesFromWatch } from "../../../../store/athletes";

import ResetButtonComponent from "./Component";

const ResetButtonContainer = props => (
  <ResetButtonComponent
    resetAll={props.resetAll}
    resetTime={props.resetTime}
    removeAllAthletesFromWatch={props.removeAllAthletesFromWatch}
  />
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  resetAll,
  resetTime,
  removeAllAthletesFromWatch
};

ResetButtonContainer.propTypes = {
  resetAll: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  removeAllAthletesFromWatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ResetButtonContainer
);
