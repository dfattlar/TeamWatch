import React from 'react';
import {View, Text, StyleSheet} from "react-native";

import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});


export default class TabView extends React.Component {
    render(){
        const drawer = this.context.drawer;
        return (
            <View style={[styles.container, this.props.sceneStyle]}>
                <Text>Tab {this.props.title}</Text>

            </View>
        );
    }
}

TabView.contextTypes = {
    drawer: React.PropTypes.object
};
