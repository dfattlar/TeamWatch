'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as athleteActions from '../actions/athleteActions';
import {COLORS, BASE_NAV_OPTIONS} from '../constants';
import {connect} from 'react-redux';
import AthleteRow from '../components/athleteRow';
import {SwipeListView} from 'react-native-swipe-list-view';
import {View, StyleSheet, Text, TouchableHighlight, Alert} from 'react-native';
import NavButton from '../components/navButton';

class AthleteStore extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => ({
    ...BASE_NAV_OPTIONS,
    headerTitle: 'Athletes',
    headerBackTitle: null,
    headerRight: (
      <NavButton
        buttonAction={() => navigation.navigate('AddAthlete')}
        label={'+ Add'}
      />
    ),
  });

  render() {
    const {state, actions} = this.props;
    const store = state.athlete.athleteStore;

    function deleteAthleteConfirm(id) {
      Alert.alert(
        'Delete Athlete',
        'Are you sure you want to delete this Athlete and their records?',
        [
          {text: 'Cancel', onPress: () => {}},
          {text: 'OK', onPress: () => actions.deleteAthlete(id)},
        ],
      );
    }

    if (store.length) {
      debugger;
      return (
        <View style={styles.container}>
          <SwipeListView
            data={this.props.state.athlete.athleteStore}
            renderItem={rowData => (
              <AthleteRow rowData={rowData} actions={actions} />
            )}
            renderHiddenItem={(data, secId, rowId, rowMap) => (
              <TouchableHighlight
                style={styles.rowBack}
                onPress={() => {
                  rowMap[`${secId}${rowId}`].closeRow();
                  deleteAthleteConfirm(data.id);
                }}>
                <Text style="{styles.deleteText}">Delete</Text>
              </TouchableHighlight>
            )}
            disableRightSwipe={true}
            rightOpenValue={-75}
            style={styles.athleteListView}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.noAthContainer]}>
          <Text style={styles.noAthTitle}>Add An Athlete</Text>
          <Text style={styles.noAthText}>
            Tap the '+Add' button above to create an athlete.
          </Text>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(athleteActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AthleteStore);

// style the react component
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noAthContainer: {
    alignItems: 'center',
  },
  noAthTitle: {
    fontSize: 24,
    fontWeight: '200',
    marginTop: 15,
    fontFamily: 'GothamRounded-Medium',
  },
  noAthText: {
    fontSize: 16,
    fontWeight: '200',
    margin: 20,
    fontFamily: 'GothamRounded-Medium',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_CONTAINER,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  deleteText: {
    fontFamily: 'GothamRounded-Medium',
  },
});
