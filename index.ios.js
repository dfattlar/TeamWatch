// import some code we need
var React = require('react-native');
var AthleteRow = require('./athleteRow');
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
  ListView
} = React;

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
      id: 0
    }
  },
  render: function () {
    var modalBackgroundStyle = {
          backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>
            {this.state.timeElapsed}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
          {this.athleteButton()}
        </View>
      </View>
      <Modal
        visible={this.state.modalVisible}>
        <View style={[styles.container2, modalBackgroundStyle]}>
          <TouchableHighlight
            onHideUnderlay={this._onUnhighlight}
            onPress={this._setModalVisible.bind(this, false)}
            onShowUnderlay={this._onHighlight}
            style={[styles.button, this.props.style]}
            underlayColor="#a9d9d4">
              <Text style={styles.buttonText}>Close</Text>
          </TouchableHighlight>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>

            <Text>Add the athletes name: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({newAthlete: text})}
              value={this.state.newAthlete}
            />

            <TouchableHighlight
              onHideUnderlay={this._onUnhighlight}
              onPress={this.modifyAthleteList}
              onShowUnderlay={this._onHighlight}
              style={[styles.button, this.props.style]}
              underlayColor="#a9d9d4">
                <Text style={styles.buttonText}>Add Athlete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return <AthleteRow
                    key={rowData.id}
                    rowData={rowData}
                    athletesData={this.state.athletes}
                    timeElapsed={this.state.timeElapsed}/>}}
        />
      </View>
    </View>
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
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style = {[styles.button, style]}
      >
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function () {
    return <TouchableHighlight underlayColor="gray"
      style={styles.button} onPress={this.handleResetPress}>
      <Text>
        Reset
      </Text>
    </TouchableHighlight>
  },
  athleteButton: function () {
    return <TouchableHighlight underlayColor="gray"
      style={styles.button}
      onPress={this._setModalVisible.bind(this, true)} >
      <Text>
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

    this.setState({
      startTime: new Date()
    });

    this.interval = setInterval(() => {
      // Update our state with some new value
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },
  handleResetPress: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      timeElapsed: 0,
      running: false,
      startTime: null,
      athletes: [],
      modalActive: false,
      modalVisible: false,
      transparent: true,
      newAthlete: '',
      dataSource: ds.cloneWithRows([]),
      id: 0
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
    var athletesArray = this.state.athletes;
    athletesArray.push({id: ++this.state.id, name: this.state.newAthlete, splits: []});
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(athletesArray),
      athletes: athletesArray,
      modalVisible: false,
      newAthlete: ''
    })
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
    flex: 5, // takes 5/8ths of available space
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText: {
    fontSize: 30
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  }
});

AppRegistry.registerComponent('TeamWatch', function(){
  return TeamWatch;
});
