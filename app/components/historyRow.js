'use strict';

import moment from 'moment';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {withNavigation} from 'react-navigation';
import {COLORS} from '../constants';

class HistoryRow extends Component {
  constructor(props) {
    super(props);
    this.goToHistoryDetail = this.goToHistoryDetail.bind(this);
  }

  goToHistoryDetail() {
    const historyData = this.props.rowData.item;
    historyData.eventName = historyData.name;
    debugger;
    this.props.navigation.navigate({
      routeName: 'HistoryDetail',
      params: historyData,
    });
  }

  render() {
    const {startTime, name} = this.props.rowData.item;
    return (
      <TouchableHighlight onPress={this.goToHistoryDetail}>
        <View style={styles.athleteRow} /*key={id}*/>
          <View style={styles.rowBorder}>
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTime}>
                {name ? name : formatSplit(startTime)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default withNavigation(HistoryRow);

function formatSplit(split, endTime) {
  return moment(split).format('MMM Do - hh:mm:ss A');
}

const styles = StyleSheet.create({
  athleteRow: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  rowBorder: {
    flex: 13,
    borderBottomColor: COLORS.BACKGROUND_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  athleteNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  athleteRowName: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  athleteRowNameText: {
    fontSize: 24,
    color: COLORS.FONT_LIGHT,
    fontWeight: '300',
    fontFamily: 'GothamRounded-Medium',
  },
  splits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 6,
    paddingLeft: 10,
    height: 20,
  },
  split: {
    paddingRight: 10,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'GothamRounded-Medium',
  },
  rowButton: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowButtonText: {
    color: COLORS.FONT_LIGHT,
  },
  totalTimeContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalTime: {
    color: COLORS.FONT_MEDIUM,
    fontSize: 24,
    fontFamily: 'GothamRounded-Medium',
  },
});
