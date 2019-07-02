import React from "react";
import { connect } from 'react-redux';
import { ActivityIndicator, View } from "react-native";
import { getAccessToken, getTokenExpirationTime } from "../core/user/selectors";

export class Loading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    if (!this.props.accessToken) {
      this.props.navigation.navigate("Signin");
    } else {
      if (!this.props.tokenExpirationTime || new Date().getTime() > this.props.tokenExpirationTime) {
        // TODO: Refresh token here.
        this.props.navigation.navigate("Signin");
      } else {
        this.props.navigation.navigate("Playlists");
      }
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
