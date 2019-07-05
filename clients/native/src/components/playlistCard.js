import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

export class PlaylistCard extends React.Component {

  _onPress = () => {
    this.props.onPress(this.props.playlist.id);
  }

  render() {
    const {
      playlist
    } = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.container}
          activeOpacity={0.95}
          onPress={this._onPress}>
          <Text style={styles.playlist}>{playlist.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    justifyContent: 'center',
    height: 60,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12
  },
  playlist: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  }
});
