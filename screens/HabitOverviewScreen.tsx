import * as React from "react";
import { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import AddHabitModal from "../components/AddHabitModal";
import { HABIT_KEY_PREFIX } from "../contants";
import HabitModel from "../models/HabitModel";
import { getHabitKey } from "../utils/HabitKey";
import HabitComponent from "./../components/Habit";
import { getAllHabitsFromLocalStorage } from "./Helpers";

const HabitOverviewScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState<HabitModel[]>([]);

  useEffect(() => {
    // Async function wrapper needed for async functions in useEffect hook
    const fetchHabits = async () => {
      const fetchedHabits = await getAllHabitsFromLocalStorage();
      setHabits(fetchedHabits);
    };

    fetchHabits();
  }, []);

  const handleSubmitHabit = (habit: HabitModel) => {
    storeHabitInLocalStorage(habit);
    setHabits([...habits, habit]);
  };

  const storeHabitInLocalStorage = async (habit: HabitModel) => {
    try {
      const habitKey = getHabitKey(habit.title);
      await AsyncStorage.setItem(habitKey, JSON.stringify(habit));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (habitTitle: string) => {
    const habitKey = getHabitKey(habitTitle);
    await AsyncStorage.removeItem(habitKey);

    const newHabits = habits.filter(habit => habit.title !== habitTitle);
    setHabits(newHabits);
  };

  const delete2 = async () => {
    AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <Button title="Add habit 2" onPress={() => setShowModal(true)} />
      <Button title="delete" onPress={delete2} />
      <ScrollView style={{ marginTop: 10 }}>
        <View style={styles.habitsContainer}>
          {habits.map(habit => (
            <HabitComponent
              key={habit.title}
              habit={habit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>
      <AddHabitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  habitsContainer: {
    flex: 1,
    flexDirection: "column"
  }
});

HabitOverviewScreen.navigationOptions = {
  title: "Habit Overview",
  headerTitle: "Test"
};

export default HabitOverviewScreen;
