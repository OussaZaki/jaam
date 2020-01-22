import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

export class PlaylistCard extends React.Component {

  _onPress = (event) => {
    const { nativeEvent } = event;

    // TODO: move to configuration page
    const quizTime = nativeEvent.locationX > 160 ? 1 : (nativeEvent.locationX < 60 ? 0 : 0.5);
    this.props.onPress(this.props.playlist.id, quizTime);
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
