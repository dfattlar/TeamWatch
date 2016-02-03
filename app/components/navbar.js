import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
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

export default class NavBar extends Component {
  render() {
    return (
        <View style={styles.toolbar}>
             <Text style={styles.toolbarButton}></Text>
             <Text style={styles.toolbarTitle}>TeamWatch</Text>
        </View>
    );
  }
}
