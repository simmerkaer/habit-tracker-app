import * as React from "react";
import { useEffect } from "react";
import { AsyncStorage, Button, StyleSheet, Text, View } from "react-native";
import { HABIT_KEY_PREFIX } from "../contants";
import { useDailyHabits } from "../hooks/useDailyHabits";
import { useNavigation } from "../hooks/useNavigation";
import HabitModel from "../models/HabitModel";
import { getAllHabitsFromLocalStorage } from "./Helpers";

const YourDayScreen = () => {
  const [habits, setHabits] = useDailyHabits();

  return (
    <View style={styles.container}>
      <Text>Your daily habits</Text>
      {habits.map(habit => (
        <Text key={habit.title}>{habit.title}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

YourDayScreen.navigationOptions = {
  title: "Your Day"
};
export default YourDayScreen;
