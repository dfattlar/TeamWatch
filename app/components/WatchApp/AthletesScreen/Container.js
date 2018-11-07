"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

import AthletesScreenComponent from "./Component";

class AthletesScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>Athletes</Text>,
      headerRight: (
        <Button onPress={() => navigation.navigate("AddAthlete")} title="+" />
      )
    };
  };

  render() {
    return (
      <AthletesScreenComponent
        athletesStore={this.props.athletesStore}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    athletesStore: state.athletes.athletesStore
  };
};

const mapDispatchToProps = {};

AthletesScreenContainer.propTypes = {
  athletesStore: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AthletesScreenContainer
);
