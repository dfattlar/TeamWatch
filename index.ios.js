// import some code we need
var React = require('react-native');
var _ = require('lodash');
var moment = require('moment');
// var formatTime = require('minutes-seconds-milliseconds');
// destructuring
var {
  Modal,
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  TextInput,
  ListView,
  Alert
} = React;

var athleteColors = ['#51EC91', '#433C3C', '#91897D', '#8AF4B6', '#90AABF'];

// create a react component
var TeamWatch = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var athletes = [];
    return {
      timeElapsed: 0,
      running: false,
      startTime: null,
      laps: [],
      athletes: athletes,
      modalActive: false,
      modalVisible: false,
      transparent: true,
      newAthlete: '',
      dataSource: ds.cloneWithRows(athletes),
      id: 0,
      currentColorId: 0
    }
  },
  render: function () {
    var modalBackgroundStyle = {
          backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return <View>
               <View style={styles.toolbar}>
                   <Text style={styles.toolbarButton}></Text>
                   <Text style={styles.toolbarTitle}>TeamWatch</Text>
                   {this.athleteButton()}
               </View>

    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.timerWrapper]}>
          <View style={[styles.timerItem]}>
            <Text style={[styles.timerMinutes, styles.timerText, styles.darkText]}>
              {moment(this.state.timeElapsed).format('mm')}
            </Text>
          </View>
          <Text style={[styles.timerColon, styles.darkText]}>
            :
          </Text>
          <View style={[styles.timerItem]}>
            <Text style={[styles.timerSeconds, styles.timerText, styles.darkText]}>
              {moment(this.state.timeElapsed).format('ss')}
            </Text>
          </View>
          <Text style={[styles.timerColon, styles.darkText]}>
            :
          </Text>
          <View style={[styles.timerItem]}>
            <Text style={[styles.timerMilli, styles.timerText, styles.darkText]}>
              {moment(this.state.timeElapsed).format('SS')}
            </Text>
          </View>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.resetButton()}
        </View>
      </View>
      <Modal
        visible={this.state.modalVisible}>
        <View style={[styles.container2, modalBackgroundStyle]}>
          <TouchableHighlight
            onHideUnderlay={this._onUnhighlight}
            onPress={this._setModalVisible.bind(this, false)}
            onShowUnderlay={this._onHighlight}
            style={[styles.modalClose]}
            underlayColor="#a9d9d4">
              <Text style={styles.modalCloseText}>Close</Text>
          </TouchableHighlight>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>

            <Text style={styles.modalLabel}>Add the athletes first and last name: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
              onChangeText={(text) => this.setState({newAthlete: text})}
              value={this.state.newAthlete}
            />

            <TouchableHighlight
              onHideUnderlay={this._onUnhighlight}
              onPress={this.modifyAthleteList}
              onShowUnderlay={this._onHighlight}
              style={[styles.modalSaveButton, this.props.style]}
              underlayColor="#a9d9d4">
                <Text style={styles.modalSaveButtonText}>Add Athlete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View>
        <ListView
          dataSource={this.state.dataSource}
          style={styles.athleteListView}
          renderRow={(rowData) => {
            return this.athleteRow(rowData);
          }}
        />
      </View>
    </View>
  </View>
  },
  athleteRow: function(rowData){
    var { name, splits, id, colorId } = rowData;
    var initials = name.split(' ').map(function(i){
      return i.slice(0,1).toUpperCase();
    }).join('');
    function eachSplit() {
      return splits.map((split, i) => {
        var formattedSplit;
        if(split < 1000){
          formattedSplit = moment(split).format('.SS');
        } else if(split < 10000){
          formattedSplit = moment(split).format('s.SS');
        } else if( split < 60000){
          formattedSplit = moment(split).format('ss.SS');
        } else if( split < 600000){
          formattedSplit = moment(split).format('m:ss.SS');
        } else if( split < 3600000){
          formattedSplit = moment(split).format('mm:ss.SS');
        } else {
          formattedSplit = moment(split).format('h:mm:ss.SS');
        }
        return <Text style={styles.split}
                key={i}>
          { formattedSplit }
        </Text>
      });
    }

    return <TouchableHighlight
          onPress={this.addSplit.bind(this, id)}
          style={[styles.athleteRow]}
        >
          <View style={styles.athleteRow} key={id}>
            <View style={[styles.athleteRowName, {
                borderColor: athleteColors[colorId],
                backgroundColor: athleteColors[colorId]
              }]}>
              <Text style={styles.athleteRowNameText}>
                {initials}
              </Text>
            </View>
            <View style={styles.splits}>
              { eachSplit() }
            </View>
          </View>
        </TouchableHighlight>

  },
  addSplit: function(id) {

    var athletesData = this.state.athletes;
    var time = this.state.timeElapsed;
    var thisAthlete = _.find(athletesData, function(item){
      return item.id === id;
    });
    thisAthlete.splits.push(time);
    var index = _.indexOf(athletesData, _.find(athletesData, {id: id}));
    var leftArr = athletesData.slice(0, index);
    var rightArr = athletesData.slice(index + 1);
    var combinedArr = leftArr.concat(thisAthlete).concat(rightArr);
    athletesData = combinedArr;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      athletes: athletesData,
      dataSource: ds.cloneWithRows(athletesData)
    });
  },
  laps: function () {
    return this.state.laps.map(function (lap, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(lap)}
        </Text>
      </View>
    });
  },
  startStopButton: function () {
    var depStyle = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style = {[styles.button, depStyle]}
      >
      <Text style={[styles.darkText]}>
        {this.state.running ? 'Hold' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  resetButton: function () {
    return <TouchableHighlight underlayColor="gray"
      style={[styles.button]}
      onPress={() => Alert.alert(
        'Are you sure you want to reset running time and athletes?',
        null,
        [
          {text: 'OK', onPress: () => this.handleResetPress()},
          {text: 'Cancel', onPress: () => console.log('cancelled')}
        ]
      )}>
      <Text style={[styles.darkText]}>
        Reset
      </Text>
    </TouchableHighlight>
  },
  athleteButton: function () {
    return <TouchableHighlight
      style={styles.toolbarButton}
      onPress={this._setModalVisible.bind(this, true)} >
      <Text
      style={styles.toolbarButtonText}>
        Add Athlete
      </Text>
    </TouchableHighlight>
  },
  handleStartPress: function () {
    // is timer running
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
    }

    var startTime = new Date();
    if(this.state.startTime === 0 || this.state.startTime === null){
      this.setState({
        startTime: startTime,
        running: true
      });
    } else {
      this.setState({
        running: true
      });
    }

    this.interval = setInterval(() => {
      // Update our state with some new value
      if(this.state.running){
        this.setState({
          timeElapsed: new Date() - this.state.startTime,
        });
      } else {
        clearInterval(this.interval);
        return;
      }
    }, 30);
  },
  handleResetPress: function() {
    this.setState({
      running: false
    });
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      timeElapsed: 0,
      startTime: 0,
      athletes: [],
      modalActive: false,
      modalVisible: false,
      transparent: true,
      newAthlete: '',
      dataSource: ds.cloneWithRows([]),
      id: 0,
      currentColorId: 0
    });
  },
  handleAthletePress: function() {
    this.setState({active: true});
  },
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  _onHighlight() {
    this.setState({active: true});
  },
  _onUnhighlight() {
    this.setState({active: false});
  },
  modifyAthleteList() {
    if(this.state.newAthlete !== ''){
      var athletesArray = this.state.athletes;
      var athleteColor = this.state.currentColorId;
      debugger;
      athletesArray.push({id: ++this.state.id, name: this.state.newAthlete, splits: [], colorId: athleteColor});
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(athletesArray),
        athletes: athletesArray,
        modalVisible: false,
        newAthlete: '',
        currentColorId: ++this.state.currentColorId
      });
      return;
    } else {
      return;
    }
  }
});

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
  button: {
    borderWidth: 2,
    height: 55,
    width: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#51EC91'
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
    }
});

AppRegistry.registerComponent('TeamWatch', function(){
  return TeamWatch;
});
