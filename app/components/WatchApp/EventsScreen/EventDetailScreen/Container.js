import React, { Component } from "react";

import EventDetailComponent from "./Component";
import PropTypes from "prop-types";

class EventDetailContainer extends Component {
  render() {
    return <EventDetailComponent data={this.props.navigation.state.params} />;
  }
}

EventDetailContainer.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.object.isRequired
    })
  })
};

export default EventDetailContainer;
