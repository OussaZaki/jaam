import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getTokens } from "../auth/getTokens";

export default class Signin extends React.Component {
  state = { isSignedIn: false };
  
  async componentDidMount() {
    const tokenExpirationTime = await getUserData("expirationTime");
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      
    }
  }

  render() {
    const { navigate } = this.props.navigation;

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
          <TouchableOpacity onPress={() => navigate("Playlists")}>
            <Text style={styles.spotifyButton}>Connect Spotify</Text>
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
