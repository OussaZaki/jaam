import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";

import { login } from "../core/user/actions";
import { getIsLoading, getAccessToken } from "../core/user/selectors";

export class Signin extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.accessToken !== prevProps.accessToken) {
      this.props.navigation.navigate("Playlists");
    }
  }

  render() {
    return (
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
              this.props.isLoading
                ? <ActivityIndicator size="large" color="#1DB954" />
                : <Text style={styles.spotifyButton}>Connect Spotify</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 28,
    fontWeight: "bold"
  },
  content: {
    flex: 8
  },
  description: {
    fontSize: 18,
    textAlign: "center"
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
    fontWeight: "500"
  }
});

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  accessToken: getAccessToken(state)
});

const mapDispatchToProps = {
  login: login.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);