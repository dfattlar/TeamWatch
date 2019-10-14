import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import WatchAthletesListComponent from './Component';

const WatchAthletesListContainer = props => (
  <WatchAthletesListComponent athletesArray={props.athletesArray} />
);

const mapStateToProps = state => {
  return {
    athletesArray: state.watch.athletesArray,
  };
};

const mapDispatchToProps = {};

WatchAthletesListContainer.propTypes = {
  athletesArray: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WatchAthletesListContainer);
