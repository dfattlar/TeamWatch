import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { resetAll, resetTime, resetAthleteList } from "../../../../store/watch";

import ResetButtonComponent from "./Component";

class ResetButtonContainer extends Component {
  render() {
    return (
      <ResetButtonComponent
        resetAll={this.props.resetAll}
        resetTime={this.props.resetTime}
        /*resetAthleteList={this.props.resetAthleteList}*/
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  resetAll,
  resetTime
};

ResetButtonContainer.propTypes = {
  resetAll: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired
  // resetAthleteList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ResetButtonContainer
);
