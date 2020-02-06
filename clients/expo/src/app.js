import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { View, ImageBackground } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

import { Router } from './routes';
import configureStore from './core/store';
import AudioInterface from './core/audioInterface/index.expo';

const { persistor, store } = configureStore();

const FakeSplah = ({ loadCallback }) => (
  <View style={{ flex: 1 }}>
    <ImageBackground
      source={require('../../assets/jaam-splash.png')}
      style={{ width: '100%', height: '100%' }}
      onLoad={loadCallback || null} />
  </View>
)

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
  };

  _bootstrap = async () => {
    AudioInterface.initAudioInterface();
    this._cacheSplashResourcesAsync();
  }

  _cacheSplashResourcesAsync = async () => {
    const png = require('../../assets/jaam-splash.png');
    return Asset.fromModule(png).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('../../assets/jaam-splash.png')
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
          startAsync={this._bootstrap}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <FakeSplah loadCallback={this._cacheResourcesAsync} />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<FakeSplah />} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
