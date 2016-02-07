'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Navbar from '../components/navbar';
import StartStopButton from '../components/startStopButton';
import * as teamWatchActions from '../actions/teamWatchActions';
import { connect } from 'react-redux';

const {
    View,
    StyleSheet,
    Text
} = React;

// style the react component
var styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
    alignItems: 'stretch'
  },
  header: { // yellow
    flex: 1
  },
  footer: { // blue
    flex: 1
  },
  timerWrapper: { // red
    flex: 1, // takes 5/8ths of available space
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  timerItem: { // red
    flex: 1, // takes 5/8ths of available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    fontSize: 70
  },
  timerColon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 60
  },
  buttonWrapper: { // green
    flex: 3, // takes 3/8ths of available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  stopButton: {
    borderColor: '#433C3C'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText: {
    fontSize: 30
  },
  darkText: {
    color: '#433C3C'
  },

  /* modal styles */
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'column'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 16,
    paddingBottom: 20
  },
  modalButton: {
    marginTop: 10,
  },
  modalClose: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    height: 40,
    width: 80,
    position: 'absolute',
    top: 40,
    right: 20
  },
  modalCloseText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 10
  },
  modalSaveButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#433C3C',
    borderRadius: 6,
    height: 40,
    width: 120,
  },
  modalSaveButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 10
  },
  /* athleteRow styles */
  athleteListView: {
    marginTop: 20
  },
  athleteRow: {
    height: 60,
    flex: 1,
    flexDirection: 'row'
  },
  athleteRowName: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  athleteRowNameText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  splits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 10,
    height: 30
  },
  split: {
    paddingRight: 10,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold'
  },
  rowButton: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowButtonText:{
    color: '#fff'
  },
  splitButton: {
    backgroundColor: 'red',
    alignSelf: 'flex-end'
  },
  finishButton: {
    backgroundColor: 'black',
    alignSelf: 'flex-end'
  },
  toolbar:{
        backgroundColor:'#90AABF',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 70
    },
    toolbarButtonText:{
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize: 20
    },
    addPersonIcon: {
        width: 25,
        height: 25,
        left: 15
    }
});

// @connect(state => ({
//   state: state.counter
// }))

class TeamWatchApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
        <View>
            <Navbar />
            <Text>{timeFormatting(state.time)}</Text>
            <View style={[styles.buttonWrapper]}>
                <StartStopButton watcher={state} {...actions} />
                <StartStopButton watcher={state} {...actions} />
            </View>
        </View>
    );
  }
}

function timeFormatting(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m} : ${s} . ${ms}`;
}

export default connect(state => ({
    state: state.watcher
  }),
  (dispatch) => ({
    actions: bindActionCreators(teamWatchActions, dispatch)
  })
)(TeamWatchApp);
