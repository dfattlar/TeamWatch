"use strict";

import React, { Component } from "react";
import EventsScreenComponent from "./Component";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const EventsScreenContainer = props => (
  <EventsScreenComponent eventsStore={props.eventsStore} />
);

const mapStateToProps = state => {
  return {
    eventsStore: state.events.eventsStore
  };
};

const mapDispatchToProps = {};

EventsScreenContainer.propTypes = {
  eventsStore: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EventsScreenContainer
);
