import * as React from "react";
import { useEffect, useState } from "react";
import { AsyncStorage, Button, StyleSheet, Text, View } from "react-native";
import AddHabitModal from "../components/AddHabitModal";
import { HABIT_KEY_PREFIX } from "../contants";
import { getHabitKey } from "../utils/HabitKey";
import Habit from "./../models/Habit";

const HabitOverviewScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);

  const getAllHabitsFromLocalStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const habitKeys = keys.filter(key => key.includes(HABIT_KEY_PREFIX)); // TODO: Replace with regex to make more robust
      const allHabits = await AsyncStorage.multiGet(habitKeys);

      const habitsFromLocalStorage: Habit[] = allHabits.map(x =>
        JSON.parse(x[1])
      );
      return habitsFromLocalStorage;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Async function wrapper needed for async functions in useEffect hook
    const fetchHabits = async () => {
      const fetchedHabits = await getAllHabitsFromLocalStorage();
      console.log(JSON.stringify(fetchedHabits));
      setHabits(fetchedHabits);
    };

    fetchHabits();
  }, []);

  const handleSubmitHabit = (habit: Habit) => {
    storeHabitInLocalStorage(habit);
    setHabits([...habits, habit]);
  };

  const storeHabitInLocalStorage = async (habit: Habit) => {
    try {
      const habitKey = getHabitKey(habit.title);
      await AsyncStorage.setItem(habitKey, JSON.stringify(habit));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Habit details</Text>
      <Button title="Add habit" onPress={() => setShowModal(true)} />
      {habits.map(x => (
        <Text key={x.title}>{x.title}</Text>
      ))}
      <AddHabitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitHabit}
      />
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

HabitOverviewScreen.navigationOptions = {
  title: "Habit Overview",
  headerTitle: "Test"
};

export default HabitOverviewScreen;
