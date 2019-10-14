"use strict";

import moment from "moment";
import React, { Component } from "react";
import EventRowComponent from "./Component";
import PropTypes from "prop-types";

import styles from "./Styles";

const EventRowContainer = props => <EventRowComponent item={props.item} />;

EventRowContainer.propTypes = {
  item: PropTypes.object.isRequired
};

export default EventRowContainer;
