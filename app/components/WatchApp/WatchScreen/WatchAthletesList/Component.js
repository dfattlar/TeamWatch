'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';
import WatchAthleteRow from './WatchAthleteRow';

import styles from './Styles';
const ITEM_HEIGHT = 50;
export default class WatchAthletesListComponent extends Component {
  constructor(props) {
    super(props);

    this.renderItem = ({item}) => {
      return (
        <WatchAthleteRow item={item} routeParent={{routeParent: 'watch'}} />
      );
    };

    this.emptyList = () => {
      return (
        <View style={styles.noAthContainer}>
          <Text style={styles.noAthTitle}>Add Athletes to the Watch</Text>
          <Text style={styles.noAthText}>
            Tap the Athletes tab below. Then create an athlete or tap the cirlce
            next to their name to add them to the watch.
          </Text>
        </View>
      );
    };

    this.itemLayout = (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    });
  }

  render() {
    const {athletesArray} = this.props;
    const data = athletesArray;

    return (
      <FlatList
        ref={c => {
          this.flatList = c;
        }}
        style={styles.athleteListView}
        data={data}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        ListEmptyComponent={this.emptyList}
      />
    );
  }
}

WatchAthletesListComponent.propTypes = {
  atheletesOnWatch: PropTypes.array,
};
