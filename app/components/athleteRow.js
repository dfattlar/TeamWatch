import moment from 'moment';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from 'react-native';

const athleteColors = ['#51EC91', '#433C3C', '#91897D', '#8AF4B6', '#90AABF'];

const styles = StyleSheet.create({
    athleteRow: {
        height: 80,
        flex: 1,
        flexDirection: 'row'
    },
    rowBorder: {
        flex: 13,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    athleteNameContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#fff',
        fontWeight: '300'
    },
    splits: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 6,
        paddingLeft: 10,
        height: 20
    },
    split: {
        paddingRight: 10,
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: '300'
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
    totalTimeContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalTime: {
        color: '#433C3C',
        fontSize: 24
    }
});

export default class AthleteRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {  name, splits, id, colorId, totalTime } = this.props.rowData;
    const { addSplit } = this.props;
    const initials = name.split(' ').map(function(i){
      return i.slice(0,1).toUpperCase();
    }).join('');

    function eachSplit() {
      return splits.map((split, i) => {
        const formattedSplit = formatSplit(split);
        return <Text style={styles.split}
                key={i}>
          { formattedSplit }
        </Text>
      });
    }

    return (
        <TouchableHighlight
            onPress={() => addSplit(id)}
            style={[styles.athleteRow]}
        >
            <View style={styles.athleteRow} key={id}>
                <View style={styles.athleteNameContainer}>
                    <View style={[styles.athleteRowName, {
                        borderColor: athleteColors[colorId],
                        backgroundColor: athleteColors[colorId]
                    }]}>
                        <Text style={styles.athleteRowNameText}>
                            {initials}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowBorder}>
                    <View style={styles.splits}>
                        { eachSplit() }
                    </View>
                    <View style={styles.totalTimeContainer}>
                        <Text style={styles.totalTime}>
                            { formatSplit(totalTime) }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
  }
}

function formatSplit(split){
    let formattedSplit;
    if(split === '') {
        return split;
    }

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
    return formattedSplit;
}
