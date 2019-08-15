import { AsyncStorage } from "react-native";
import { DayStatus, HabitDayModel } from "./models/HabitDayModel";
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
