import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDailyHabits } from "../hooks/useDailyHabits";
import HabitWeekView from "./../components/HabitWeekView";

const YourDayScreen = () => {
  const [dailyHabits] = useDailyHabits();

  return (
    <View style={styles.container}>
      <Text>Your daily habits</Text>
      {dailyHabits.map(habit => (
        <HabitWeekView key={habit.title} habit={habit} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

YourDayScreen.navigationOptions = {
  title: "Your Day"
};
export default YourDayScreen;
