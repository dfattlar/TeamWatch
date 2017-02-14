import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Modal,
    TextInput
} from 'react-native'

const styles = StyleSheet.create({
    history: {
        marginTop: 60,
        flex: 1
    }
})

export default class HistoryDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { athletesArray, relayFinishTime, startTime } = this.props

        return (
            <View style={[styles.history]}>
                <Text>Athlete!</Text>
                <Text>Athlete!</Text>
                <Text>Athlete!</Text>
                <Text>Athlete!</Text>
                <Text>{startTime}!</Text>
                <Text>{relayFinishTime}!</Text>
                <Text>{athletesArray.length}!</Text>
            </View>
        )
    }
}
