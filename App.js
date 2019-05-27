import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import SigninScreen from "./screens/Signin";
import PlaylistsScreen from "./screens/Playlists";
import LoadingScreen from "./screens/Loading";

const AppStack = createStackNavigator({ Playlists: PlaylistsScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Loading: LoadingScreen,
      Signin: SigninScreen
    },
    {
      initialRouteName: "Loading",
      headerMode: "none",
      navigationOptions: {
        headerVisible: false
      }
    }
  )
);
