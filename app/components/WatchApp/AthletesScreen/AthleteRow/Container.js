import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AthleteRowComponent from "./Component";

import {
  addAthleteToWatch,
  removeAthleteFromWatch
} from "../../../../store/athletes";

const AthleteRowContainer = props => (
  <AthleteRowComponent
    item={props.item}
    addAthleteToWatch={props.addAthleteToWatch}
    removeAthleteFromWatch={props.removeAthleteFromWatch}
  />
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addAthleteToWatch,
  removeAthleteFromWatch
};

AthleteRowContainer.propTypes = {
  addAthleteToWatch: PropTypes.func.isRequired,
  removeAthleteFromWatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AthleteRowContainer
);
