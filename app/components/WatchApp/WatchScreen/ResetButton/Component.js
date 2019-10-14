'use strict';

import React, {Component} from 'react';
import {Text, TouchableHighlight, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../../../../constants';

import styles from './Styles';

export default class ResetButtonComponent extends Component {
  constructor() {
    super();
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset = () => {
    const {resetAll, resetTime, removeAllAthletesFromWatch} = this.props;
    Alert.alert('What would you like to reset?', null, [
      {
        text: 'Reset Time And Splits Only',
        onPress: () => {
          resetTime();
        },
      },
      {
        text: 'Reset Time and Athletes',
        onPress: () => {
          resetAll();
          removeAllAthletesFromWatch();
        },
      },
      {text: 'Cancel', onPress: () => console.log('cancelled')},
    ]);
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor={COLORS.BUTTON_UNDERLAY}
        style={[styles.button]}
        onPress={this.handleReset}>
        <Text style={[styles.buttonText]}>RESET</Text>
      </TouchableHighlight>
    );
  }
}

ResetButtonComponent.propTypes = {
  resetAll: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  removeAllAthletesFromWatch: PropTypes.func.isRequired,
};
