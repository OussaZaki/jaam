import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as selectors from "../core/playlists/selectors";
import { GameTimer } from "../components/gameTimer";

class Quiz extends React.Component {
  state = {
    score: 0
  }

  _finishCallback = () => {
    this.props.navigation.navigate("Playlists");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.visual}>
          <TouchableOpacity onPress={this._finishCallback}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>Here goes the music visualizations!!</Text>
        </View>

        <View style={styles.timer}>
          <GameTimer time={2} onFinish={this._finishCallback} />
        </View>

        <View style={styles.question}>
          <Text>{this.props.playlist.name} Question goes here!</Text>
        </View>

        <View style={styles.answer}>
          <Text style={styles.option}>Answer options goes here!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  visual: {
    backgroundColor: '#FFBE00', //#FFD800, #FFC30B, #FFBE00
    justifyContent: 'center',
    alignItems: 'center',
    height: "30%",
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "5%"
  },
  question: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "20%"
  },
  answer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: "45%"
  },
  option: {
    color: '#fff'
  }
});

const mapStateToProps = state => ({
  playlist: selectors.getSelectedPlaylist(state)
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
