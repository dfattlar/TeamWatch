import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addEvent} from '../../../../store/events';

import SaveButtonComponent from './Component';

const SaveButtonContainer = props => (
  <SaveButtonComponent addEvent={props.addEvent} watch={props.watch} />
);

const mapStateToProps = state => ({
  watch: state.watch,
});

const mapDispatchToProps = {
  addEvent,
};

SaveButtonContainer.propTypes = {
  addEvent: PropTypes.func.isRequired,
  watch: PropTypes.any, // todo replace with objectOf
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveButtonContainer);
