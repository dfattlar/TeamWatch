import React from 'react';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants';

export default function NavButton({buttonAction, label}) {
  return (
    <TouchableHighlight onPress={buttonAction} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    marginTop: 5,
  },
  label: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: COLORS.FONT_LIGHT,
  },
});
