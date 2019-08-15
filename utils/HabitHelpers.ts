import { StyleSheet } from "react-native";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import { isSameDay } from "./DateHelpers";

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
  }
});
