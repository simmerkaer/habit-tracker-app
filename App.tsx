import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HabitOverviewScreen from "./screens/HabitOverviewScreen";
import YourDayScreen from "./screens/YourDayScreen";

const YourDayStack = createStackNavigator({
  YourDayScreen
});

const HabitOverviewStack = createStackNavigator({
  HabitOverviewScreen
});

const MainNavigator = createBottomTabNavigator({
  HabitOverviewScreen: HabitOverviewStack,
  YourDayScreen: YourDayStack
});

const App = createAppContainer(MainNavigator);
export default App;
