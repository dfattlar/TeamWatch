"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createAthlete } from "../../../../store/athletes";

import AddAthleteComponent from "./Component";

const AddAthleteContainer = props => (
  <AddAthleteComponent
    createAthlete={props.createAthlete}
    navigation={props.navigation}
  />
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createAthlete
};

AddAthleteContainer.propTypes = {
  createAthlete: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AddAthleteContainer
);
