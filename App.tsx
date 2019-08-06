import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import HabitOverviewScreen from "./screens/HabitOverviewScreen";
import YourDayScreen from "./screens/YourDayScreen";

const MainNavigator = createBottomTabNavigator({
  YourDayScreen,
  HabitOverviewScreen
});

const App = createAppContainer(MainNavigator);
export default App;
