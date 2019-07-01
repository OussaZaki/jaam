import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      this.props.navigation.navigate("Signin");
    } else {
      this.setState({ accessTokenAvailable: true });
      this.props.navigation.navigate("Playlists");
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
