import React, { Component } from 'react'
import WatchAthleteRow from './watchAthleteRow'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Modal,
    TextInput,
    ListView
} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class HistoryDetail extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.athletesArray),
        }
    }

    render() {
        const { athletesArray, relayFinishTime, startTime } = this.props

        return (
            <View style={[styles.history]}>
                <ListView
                 dataSource={this.state.dataSource}
                 style={styles.athleteListView}
                 enableEmptySections={true}
                 renderRow={function(rowData) {
                     return (<WatchAthleteRow rowData={rowData} routeParent={{routeParent:'history'}} />);
                 }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    history: {
        marginTop: 65,
        flex: 1
    }
})
