import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { COLORS } from "./contants";
import HabitOverviewScreen from "./screens/HabitOverviewScreen";
import YourDayScreen from "./screens/YourDayScreen";

const tabConfig = {
  tabBarOptions: {
    style: {
      backgroundColor: COLORS.gunmetal
    }
  }
};

const YourDayStack = createStackNavigator({
  YourDayScreen
});

const HabitOverviewStack = createStackNavigator({
  HabitOverviewScreen
});

const MainNavigator = createBottomTabNavigator(
  {
    HabitOverviewScreen: HabitOverviewStack,
    YourDayScreen: YourDayStack
  },
  tabConfig
);

const App = createAppContainer(MainNavigator);
export default App;
