import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SaveEventButtonComponent from "./Component";

class SaveEventButtonContainer extends Component {
  render() {
    return <SaveEventButtonComponent />;
  }
}

const mapStateToProps = {};

const mapDispatchToProps = {};

// SaveEventButtonContainer.propTypes = {
//   time: PropTypes.number
// };

export default connect(mapStateToProps, mapDispatchToProps)(
  SaveEventButtonContainer
);
