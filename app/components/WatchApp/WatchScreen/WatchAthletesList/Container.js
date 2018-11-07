import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WatchAthletesListComponent from "./Component";

const WatchAthletesListContainer = props => (
  <WatchAthletesListComponent athletesOnWatch={props.atheletesOnWatch} />
);

const mapStateToProps = state => {
  return {
    atheletesOnWatch: state.watch.athletesOnWatch
  };
};

const mapDispatchToProps = {};

WatchAthletesListContainer.propTypes = {
  atheletesOnWatch: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WatchAthletesListContainer
);
