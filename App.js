import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/Home";
import PlaylistsScreen from "./screens/Playlists";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Playlists: {screen: PlaylistsScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
