import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import { connect } from "react-redux";

import { loginUser } from "../../../../store/session";

import LoginFormComponent from "./Component";

import translations from "../../../../i18n";

class LoginFormContainer extends Component {
  static navigationOptions = {
    tabBarLabel: translations.t("login"),
    tabBarIcon: ({ tintColor }) => <Text>Person</Text>
  };

  render() {
    return <LoginFormComponent login={this.props.login} />;
  }
}

LoginFormContainer.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login: loginUser
};

export default connect(null, mapDispatchToProps)(LoginFormContainer);
