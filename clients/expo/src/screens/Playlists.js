import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { PlaylistList } from "../components/playlistList";

import * as selectors from "../core/playlists/selectors";
import * as actions from "../core/playlists/actions";


class Playlists extends React.Component {
  componentWillMount = async () => {
    // TODO: don't fetch if we have cached playlists
    // also use https://facebook.github.io/react-native/docs/refreshcontrol for
    // drag to refresh.
    this.props.fetchPlaylists();
  };

  _onSelect = (playlistId, quizTime) => {
    this.props.selectPlaylist(playlistId);
    this.props.navigation.navigate("Quiz", {
      quizTime
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <Text style={styles.title}>{`Pick \na Playlist.`}</Text>
          <View style={styles.titleBar}></View>
        </View>
        <View style={styles.playlists}>
          {this.props.isLoading
            ? <ActivityIndicator size="large" color="#FFBE00" />
            : <PlaylistList
              playlists={this.props.playlists}
              onSelect={this._onSelect}
            />
          }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 40,
    marginHorizontal: 20
  },
  header: {
    marginVertical: 36,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: "700"
  },
  titleBar: {
    backgroundColor: "#000",
    width: 40,
    height: 6,
    marginTop: 12,
  },
  playlists: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

const mapStateToProps = state => ({
  playlists: selectors.getPlaylists(state),
  isLoading: selectors.getIsLoading(state),
});

const mapDispatchToProps = {
  fetchPlaylists: actions.fetchPlaylists.request,
  selectPlaylist: actions.selectPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
