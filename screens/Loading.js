import React from "react";
import { ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";

import { refreshTokens } from "../auth/refreshToken";

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const tokenExpirationTime = await AsyncStorage.getItem("expirationTime");
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      this.props.navigation.navigate("Signin");
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }

    this.props.navigation.navigate("App");
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
