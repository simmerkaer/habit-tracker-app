import { AsyncStorage } from "react-native";
import { HABIT_KEY_PREFIX } from "./contants";
import { DayStatus, HabitDayModel } from "./models/HabitDayModel";
import HabitModel from "./models/HabitModel";
import { getHabitKey } from "./utils/HabitKey";

export const updateHabitDaysInLocalStorage = async (
  habitToUpdate: string,
  updatedDays: HabitDayModel[]
) => {
  try {
    await AsyncStorage.mergeItem(
      getHabitKey(habitToUpdate),
      JSON.stringify({
        days: updatedDays,
        currentStreak: calculateStreak(updatedDays)
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const storeHabitInLocalStorage = async (habit: HabitModel) => {
  try {
    const habitKey = getHabitKey(habit.title);
    await AsyncStorage.setItem(habitKey, JSON.stringify(habit));
  } catch (error) {
    console.log(error);
  }
};

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
    return [];
  }
};

export const calculateStreak = (days: HabitDayModel[]) => {
  let streak = 0;
  let streakStarted = false;

  // We reverse the days and count amount of days with "Checked" status in a row before the streak is broken
  for (const day of [...days].reverse()) {
    if (day.status === DayStatus.Checked) {
      ++streak;
      streakStarted = true;
    }
    if (
      streakStarted &&
      (day.status === DayStatus.Unchecked || day.status === DayStatus.Missed)
    )
      break;
  }
  return streak;
};

const convertToDates = (habit: HabitModel) => {
  habit.startDate = new Date(habit.startDate);
  habit.endDate = new Date(habit.endDate);
  habit.days.forEach(day => (day.date = new Date(day.date)));
};
