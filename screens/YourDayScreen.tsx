import * as React from "react";
import { useEffect } from "react";
import { AsyncStorage, Button, StyleSheet, Text, View } from "react-native";
import { HABIT_KEY_PREFIX } from "../contants";
import { useNavigation } from "../hooks/useNavigation";
import HabitModel from "../models/HabitModel";
import { getAllHabitsFromLocalStorage } from "./Helpers";

const YourDayScreen = () => {
  const [habits, setHabits] = React.useState<HabitModel[]>([]);

  useEffect(() => {
    // Async function wrapper needed for async functions in useEffect hook
    const fetchHabits = async () => {
      const fetchedHabits = await getAllHabitsFromLocalStorage();
      setHabits(getDailyHabits(fetchedHabits));
    };

    fetchHabits();
  }, []);

  const getDailyHabits = (habits: HabitModel[]) => {
    return habits.filter(habit =>
      // Return true if the current habit has a day with "day.date = today"
      // We use ".toDateString()" to compare dates without time of day.
      habit.days.find(x => x.date.toDateString() === new Date().toDateString())
    );
  };

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
