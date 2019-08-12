import { AsyncStorage } from "react-native";
import { HABIT_KEY_PREFIX } from "../contants";
import HabitModel from "../models/HabitModel";

export const getAllHabitsFromLocalStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const habitKeys = keys.filter(key => key.includes(HABIT_KEY_PREFIX)); // TODO: Replace with regex to make more robust
    const allHabits = await AsyncStorage.multiGet(habitKeys);

    const habitsFromLocalStorage: HabitModel[] = allHabits.map(x =>
      JSON.parse(x[1])
    );

    // Convert JSON-strings back to javascript dates.
    habitsFromLocalStorage.forEach(convertToDates);

    return habitsFromLocalStorage;
  } catch (error) {
    console.log(error);
  }
};

const convertToDates = (habit: HabitModel) => {
  habit.startDate = new Date(habit.startDate);
  habit.endDate = new Date(habit.endDate);
  habit.days.forEach(day => (day.date = new Date(day.date)));
};
