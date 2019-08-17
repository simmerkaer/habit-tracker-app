import { useEffect, useState } from "react";
import { getAllHabitsFromLocalStorage } from "../AsyncStorageService";
import HabitModel from "./../models/HabitModel";
import { useNavigation } from "./useNavigation";

export const useHabits = (): [HabitModel[], (habits: HabitModel[]) => void] => {
  const [habits, setHabits] = useState<HabitModel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Async function wrapper needed for async functions in useEffect hook
    const fetchHabits = async () => {
      const fetchedHabits = await getAllHabitsFromLocalStorage();
      setHabits(fetchedHabits);
    };

    // Reload habits every time we arrive at this screen
    navigation.addListener("didFocus", fetchHabits);
    fetchHabits();
  }, []);

  return [habits, setHabits];
};
