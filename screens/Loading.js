import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const tokenExpirationTime = await getUserData("expirationTime");
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
