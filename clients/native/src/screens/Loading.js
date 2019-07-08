import React from "react";
import { connect } from 'react-redux';
import { ActivityIndicator, View } from "react-native";
import { getAccessToken, getTokenExpirationTime } from "../core/user/selectors";
import { refreshToken } from "../core/user/actions";

export class Loading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const {
      accessToken,
      tokenExpirationTime,
      navigation
    } = this.props;

    if (!accessToken) {
      navigation.navigate("Signin");
      return;
    }

    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      refreshToken();
    } else {
      navigation.navigate("Playlists");
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: getAccessToken(state),
  tokenExpirationTime: getTokenExpirationTime(state)
});

const mapDispatchToProps = {
  refreshToken: refreshToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
