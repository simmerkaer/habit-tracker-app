import { dayStyles } from "../components/Day";
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
  if (day.status === DayStatus.Inactive) return dayStyles.inactiveBox;
  if (day.status === DayStatus.Unchecked) return dayStyles.uncheckedBox;
  if (day.status === DayStatus.Checked) return dayStyles.checkedBox;
  return dayStyles.missedBox;
};
