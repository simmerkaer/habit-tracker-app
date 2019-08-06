import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import HabitDetail from "./screens/HabitDetail";
import HomeScreen from "./screens/HomeScreen";

const MainNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  HabitDetail
});

const App = createAppContainer(MainNavigator);

export default App;
