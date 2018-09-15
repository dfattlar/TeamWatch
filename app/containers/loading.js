// Loading.js
import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import * as userActions from "../actions/userActions";
import { Actions } from "react-native-router-flux";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setCurrentUser } = this.props.actions;

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        Actions.signUp();
      } else {
        setCurrentUser(user);
        Actions.watch();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
