var React = require('react-native');
var _ = require('lodash');

var {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ListView
} = React;

var AthleteRow = React.createClass({

  render: function () {
    var { name, splits, id } = this.props.rowData;

    function eachSplit() {
      return splits.map((split, i) => {
        return <Text key={i}>
          { split }
        </Text>
      });
    }
    return <View style={styles.row}>
        <Text>
          {name}
        </Text>
        <View>
          { eachSplit() }
        </View>
        <TouchableHighlight
          onPress={this.addSplit}
        >
          <Text>
            Split
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.addSplit}
        >
          <Text>
            Finish
          </Text>
        </TouchableHighlight>
      </View>
  },
  addSplit: function() {

    var athletesData = this.props.athletesData;
    var time = this.props.timeElapsed;
    this.props.rowData.splits.push(time);

    var index = _.indexOf(athletesData, _.find(athletesData, {id: this.props.rowData.id}));
    var leftArr = athletesData.slice(0, index);
    var rightArr = athletesData.slice(index + 1);
    var combinedArr = leftArr.concat(this.props.rowData).concat(rightArr);
    athletesData = combinedArr;

    this.setState({
      athletes: athletesData
    });
    // this.setState({
    //   splits: splits
    // });
    // var updateAthlete = this.state.athletes[index];
    // updateAthlete.splits.push(this.state.timeElapsed);
    // this.setState({
    //   athletes[index].splits.push(this.state.timeElapsed)
    // });
  }
});

var styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 60
  }
});

module.exports = AthleteRow;
