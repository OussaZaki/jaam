import React from 'react';
import { FlatList } from 'react-native';

import { PlaylistCard } from './playlistCard';


export class PlaylistList extends React.Component {
  _keyExtractor = (item, _index) => item.id;

  _renderItem = ({ item }) => (
    <PlaylistCard
      key={item.id}
      playlist={item}
      onPress={this.props.onSelect}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.playlists}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
