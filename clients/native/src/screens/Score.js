import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatTime } from "../core/utils/formatTime";

export default class Score extends React.Component {

  _goToPlaylists = () => {
    this.props.navigation.navigate("Playlists");
  }

  _goToSamePlaylist = () => {
    this.props.navigation.navigate("Quiz");
  }

  _goToInstagram = () => {
    Linking.openURL('https://instagram.com/thezaki/');
  }

  render() {
    const { navigation } = this.props;

    const isTimeOut = navigation.getParam('isTimeOut', false);
    const score = navigation.getParam('score', 3);
    const correctStreak = navigation.getParam('correctStreak', 3);
    const totalTime = navigation.getParam('totalTime', 0);

    const {
      seconds,
      minutes,
      hours
    } = formatTime(totalTime);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{
            isTimeOut
              ? `Oups you run out of time`
              : (score > 4 ? `Great job!` : `Meh game over.`)}
          </Text>
          <View style={styles.titleBar}></View>
        </View>
        <View style={styles.recap}>
          <View style={styles.recapContainer}>
            <MaterialCommunityIcons
              name="trophy-award"
              size={30}
              color={"#FFBE00"}
            />
            <Text style={styles.recapTitle}>{`Score.`}</Text>
            <Text style={styles.recapValue}>{score + ' / 10'}</Text>
          </View>
          <View style={styles.recapContainer}>
            <MaterialCommunityIcons
              name="fire"
              size={30}
              color={"#FF5607"}
            />
            <Text style={styles.recapTitle}>{`Streak.`}</Text>
            <Text style={styles.recapValue}>{correctStreak}</Text>
          </View>
          <View style={styles.recapContainer}>
            <MaterialCommunityIcons
              name="timer"
              size={30}
              color={"#000"}
            />
            <Text style={styles.recapTitle}>{`Time.`}</Text>
            <Text style={styles.recapValue}>{hours} : {minutes} : {seconds}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionContainer} onPress={this._goToPlaylists}>
            <MaterialCommunityIcons
              name="music"
              size={30}
              color={"#1DB954"}
            />
            <Text style={styles.actionTitle}>{`Back to Playlists.`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionContainer} onPress={this._goToSamePlaylist}>
            <MaterialCommunityIcons
              name="cached"
              size={30}
              color={"white"}
            />
            <Text style={styles.actionTitle}>{`Retry with same playlist.`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionContainer} onPress={this._goToInstagram}>
            <MaterialCommunityIcons
              name="heart"
              size={30}
              color={"#FE4A49"}
            />
            <Text style={styles.actionTitle}>{`Show some love.`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{`Copyright © ${(new Date()).getFullYear()} Jaam`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: "24%",
    marginBottom: "10%",
    marginHorizontal: 40,
    height: "100%",
    flexDirection: 'column'
  },
  // Header
  /////////////
  header: {
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
    marginTop: "1%"
  },
  // Recap
  /////////////
  recap: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: "18%",
  },
  recapContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#080808",
    marginTop: "2%",
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  recapTitle: {
    color: "#080808",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    flex: 2
  },
  recapValue: {
    color: "#080808",
    fontSize: 20,
    fontWeight: "600"
  },
  // Actions
  /////////////
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: "8%",
    flexGrow: 1
  },
  actionContainer: {
    backgroundColor: "#000",
    borderRadius: 6,
    marginTop: "2%",
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  actionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 12,
    flex: 2
  },
  // Header
  /////////////
  footer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 16
  },
});
