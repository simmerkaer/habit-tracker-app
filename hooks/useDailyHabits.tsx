import { useEffect, useState } from "react";
import { getAllHabitsFromLocalStorage } from "../screens/Helpers";
import HabitModel from "./../models/HabitModel";
import { useNavigation } from "./useNavigation";

export const useDailyHabits = (): [
  HabitModel[],
  (habits: HabitModel[]) => void
] => {
  const [dailyHabits, setDailyHabits] = useState<HabitModel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Async function wrapper needed for async functions in useEffect hook
    const fetchHabits = async () => {
      const fetchedHabits = await getAllHabitsFromLocalStorage();
      setDailyHabits(getDailyHabits(fetchedHabits));
    };

    // Reload habits every time we arrive at this screen
    navigation.addListener("didFocus", fetchHabits);
    fetchHabits();
  }, []);

  const getDailyHabits = (habits: HabitModel[]) => {
    return habits.filter(habit =>
      // Return true if the current habit has a day with "day.date = today"
      // We use ".toDateString()" to compare dates without time of day.
      habit.days.find(x => x.date.toDateString() === new Date().toDateString())
    );
  };
  return [dailyHabits, setDailyHabits];
};
