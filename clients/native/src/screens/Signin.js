import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";

import { login, refreshSession } from "../core/user/actions";
import { getIsLoading, getAccessToken, getTokenExpirationTime } from "../core/user/selectors";

export class Signin extends React.Component {
  state = {
    refreshing: true
  }

  componentDidMount() {
    if (!this.props.accessToken) {
      this.setState({ refreshing: false });
      return;
    }

    if (!this.props.tokenExpirationTime || new Date().getTime() > this.props.tokenExpirationTime) {
      this.props.refreshSession();
      this.setState({ refreshing: false });
    } else {
      this.props.navigation.navigate("Playlists");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.accessToken !== prevProps.accessToken) {
      this.props.navigation.navigate("Playlists");
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/jaam-splash.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.spacer} />
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to Jaam!</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.description}>
              Let's start by connecting your Spotify account!
          </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={this.props.login}>
              {
                (this.props.isLoading || this.state.refreshing)
                  ? <ActivityIndicator size="large" color="#1DB954" />
                  : <Text style={styles.spotifyButton}>Connect Spotify</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  spacer: {
    flex: 4
  },
  header: {
    flex: 2
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  content: {
    flex: 8
  },
  description: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textAlign: "center",
    fontWeight: "500"
  },
  footer: {
    flex: 4
  },
  spotifyButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#1DB954",
    color: "white",
    borderRadius: 50,
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "600"
  }
});

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  accessToken: getAccessToken(state),
  tokenExpirationTime: getTokenExpirationTime(state)
});

const mapDispatchToProps = {
  login: login.request,
  refreshSession: refreshSession.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
