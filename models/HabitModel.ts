import Days from "./Days";
import { HabitDayModel } from "./HabitDayModel";

interface HabitModel {
  title: string;
  startDate: Date;
  endDate: Date;
  days: HabitDayModel[];
  activeDays: Days[];
}

export default HabitModel;
