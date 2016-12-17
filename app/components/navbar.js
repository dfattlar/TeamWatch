import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
const { Icon } = require('react-native-icons');
console.log('ICONS --- '+Icon);
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#90AABF',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
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

export default class Navbar extends Component {
  render() {
    const { openModal } = this.props;

    return (
        <View style={styles.toolbar}>
             <Text style={styles.toolbarButton}></Text>
             <Text style={styles.toolbarTitle}>TeamWatch</Text>
             <TouchableHighlight
               style={styles.toolbarButton}
               underlayColor='transparent'
               onPress={openModal} >
               <Icon
                 name='ion|person-add'
                 size={25}
                 color='#fff'
                 style={styles.addPersonIcon}
               />
             </TouchableHighlight>
        </View>
    );
  }
}
