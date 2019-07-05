import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Score extends React.Component {
  _onBack = () => {
    this.props.navigation.navigate("Playlists");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here goes the score from the quiz!</Text>
        <Button
          onPress={this._onBack}
          title="Back"
          color="#000"
          accessibilityLabel="Go Back"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
