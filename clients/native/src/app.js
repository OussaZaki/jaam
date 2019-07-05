import React from 'react';
import { Provider } from 'react-redux';
import { Router } from './routes';
import store from './core/store';

import { View, ImageBackground } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
  };

  _cacheSplashResourcesAsync = async () => {
    const png = require('../assets/jaam-splash.png');
    return Asset.fromModule(png).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('../assets/jaam-splash.png')
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../assets/jaam-splash.png')}
            style={{ width: '100%', height: '100%' }}
            onLoad={this._cacheResourcesAsync} />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
