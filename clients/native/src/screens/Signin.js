import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { login } from "../core/auth/login.expo";

export default class Signin extends React.Component {
  state = {
    isSignedIn: false,
    isLoading: false
  };

  _login = async () => {
    this.setState({ isLoading: true });
    try {
      const token = await login();
      await AsyncStorage.setItem("accessToken", token);

      this.setState({ isLoading: false });
      this.props.navigation.navigate("Playlists")
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
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
          <TouchableOpacity onPress={this._login}>
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
