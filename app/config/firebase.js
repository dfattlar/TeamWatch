import firebase from "react-native-firebase";

const databaseRef = firebase.database().ref();
export const athletesRef = databaseRef.child("Athletes");
