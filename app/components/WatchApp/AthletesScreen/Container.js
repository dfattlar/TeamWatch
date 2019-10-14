'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';

import AthletesScreenComponent from './Component';

class AthletesScreenContainer extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Text>Athletes</Text>,
      headerRight: (
        <Button onPress={() => navigation.navigate('AddAthlete')} title="+" />
      ),
    };
  };
  debugger;
  render() {
    return (
      <AthletesScreenComponent
        athleteStore={this.props.athleteStore}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => {
  debugger;
  return {
    athleteStore: state.athletes.athleteStore,
  };
};

const mapDispatchToProps = {};

AthletesScreenContainer.propTypes = {
  athleteStore: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AthletesScreenContainer);
