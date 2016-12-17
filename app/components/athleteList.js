import moment from 'moment';
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from 'react-native';
import AthleteRow from './athleteRow';

const styles = StyleSheet.create({
    athleteListView: {
        marginTop: 20
    }
});

export default class AthleteList extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { watcher, addSplit } = this.props;

    return (
        <ListView
          dataSource={watcher.get('dataSource')}
          style={styles.athleteListView}
          renderRow={function(rowData) {
              return (<AthleteRow rowData={rowData} addSplit={addSplit}/>);
          } }
        />
    );
  }
}
