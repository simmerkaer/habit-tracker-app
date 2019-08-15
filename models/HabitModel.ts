import Days from "./Days";
import { HabitDayModel } from "./HabitDayModel";

interface HabitModel {
  title: string;
  startDate: Date;
  endDate: Date;
  days: HabitDayModel[];
  activeDays: Days[];
  currentStreak: number;
  longestStreak: number;
}

export default HabitModel;
