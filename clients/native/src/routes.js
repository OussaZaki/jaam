import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { useScreens } from 'react-native-screens';

import SigninScreen from "./screens/Signin";
import PlaylistsScreen from "./screens/Playlists";
import LoadingScreen from "./screens/Loading";
import QuizScreen from "./screens/Quiz";

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      ['Playlists']: PlaylistsScreen,
      ['Loading']: LoadingScreen,
      ['Signin']: SigninScreen,
      ['Quiz']: QuizScreen
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

const createAppRouter = (container) => {
  useScreens();
  return createAppContainer(container);
};


export const Router = createAppRouter(AppNavigator);
