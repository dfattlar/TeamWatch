// Loading.js
import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import * as userActions from "../../../actions/userActions";
import { Actions } from "react-native-router-flux";
import { athletesRef, eventsRef } from "../../../config/firebase";

import styles from "./Styles";

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.athletesRef = athletesRef;
    this.eventsRef = eventsRef;
    this.firestoreUnsubscriber = null;
    this.authUnsubscriber = null;
    Actions.login();
  }

  componentDidMount() {
    const { setCurrentUser } = this.props.actions;

    this.authUnsubscriber = firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
    // this.athletesUnsubscriber = this.athletesRef.onSnapshot(
    //   this.onCollectionUpdate
    // );
    // this.eventsUnsubscriber = this.eventsRef.onSnapshot(
    //   this.onCollectionUpdate
    // );

    // firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     Actions.signUp();
    //   } else {
    //     setCurrentUser(user);
    //     return dataPrep(user.uid);
    //   }
    // });
  }

  componentWillUnmount() {
    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
    if (this.athletesUnsubscriber) {
      this.athletesUnsubscriber();
    }
    if (this.eventsUnsubscriber) {
      this.eventsUnsubscriber();
    }
  }

  onCollectionUpdate = async querySnapshot => {
    debugger;
    await this.props.fetchPosts(querySnapshot);
  };

  render() {
    debugger;

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

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
