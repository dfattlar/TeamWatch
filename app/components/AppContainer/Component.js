import React from 'react';
import PropTypes from 'prop-types';

import {ActivityIndicator} from 'react-native';

import WatchApp from '../WatchApp';
import AuthScreen from '../AuthScreen';

import styles from './Styles';

const AppComponent = props => {
  if (props.restoring) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  } else {
    if (props.logged) {
      return <WatchApp />;
    } else {
      return <AuthScreen />;
    }
  }
};

AppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default AppComponent;
