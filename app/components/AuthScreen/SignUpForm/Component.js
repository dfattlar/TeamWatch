import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";

import styles from "./Styles";

export default class SignUpForm extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(apram => {
        debugger;
        Actions.watch();
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => Actions.login()}
        />
      </View>
    );
  }
}
