import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { useScreens } from 'react-native-screens';

import SigninScreen from "./screens/Signin";
import PlaylistsScreen from "./screens/Playlists";
import LoadingScreen from "./screens/Loading";
import QuizScreen from "./screens/Quiz";
import ScoreScreen from "./screens/Score";

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      ['Loading']: LoadingScreen,
      ['Signin']: SigninScreen,
      ['Playlists']: PlaylistsScreen,
      ['Quiz']: QuizScreen,
      ['Score']: ScoreScreen
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
