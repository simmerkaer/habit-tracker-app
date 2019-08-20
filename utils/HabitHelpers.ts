import { StyleSheet } from "react-native";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import { isSameDay, isToday } from "./DateHelpers";

export const toggleDay = (status: DayStatus) => {
  if (status === DayStatus.Unchecked) return DayStatus.Checked;
  if (status === DayStatus.Checked) return DayStatus.Missed;
  if (status === DayStatus.Missed) return DayStatus.Unchecked;
  return DayStatus.Inactive;
};

export const getHabitDayStyle = (
  habitDays: HabitDayModel[],
  dayOfWeek: Date
) => {
  const day = habitDays.find(habitDay => isSameDay(habitDay.date, dayOfWeek));
  if (!day) return dayStyles.inactiveBox;
  return getDayStyle(day.status);
};

export const getDayStyle = (dayStatus: DayStatus) => {
  if (dayStatus === DayStatus.Inactive) return dayStyles.inactiveBox;
  if (dayStatus === DayStatus.Unchecked) return dayStyles.uncheckedBox;
  if (dayStatus === DayStatus.Checked) return dayStyles.checkedBox;
  if (dayStatus === DayStatus.Missed) return dayStyles.missedBox;
  if (dayStatus === DayStatus.OutOfBound) return dayStyles.outOfBound;
  return dayStyles.uncheckedBox;
};

export const dayStyles = StyleSheet.create({
  inactiveBox: {
    backgroundColor: "grey"
  },
  checkedBox: {
    backgroundColor: "green"
  },
  uncheckedBox: {
    backgroundColor: "red"
  },
  missedBox: {
    backgroundColor: "yellow"
  },
  outOfBound: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  }
});

export const getLastFiveHabitDays = (days: HabitDayModel[]) => {
  const lastFiveArray = [];
  const indexOfToday = days.findIndex(x => isToday(x.date));

  let i = 1;
  while (lastFiveArray.length <= 4) {
    const index = indexOfToday - i;

    if (index < 0) {
      // If we are before the habit started, push an "OutOfBound" and increase "i"
      lastFiveArray.push(DayStatus.OutOfBound);
      ++i;
    } else {
      // Else we get the day and add the status unless the status is "Inactive"
      const day = days[index];
      if (day.status !== DayStatus.Inactive) {
        lastFiveArray.push(day.status);
      }
      ++i;
    }
  }

  return lastFiveArray;
};
