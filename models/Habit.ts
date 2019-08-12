import Days from "./Days";

interface HabitModel {
  title: string;
  startDate: Date;
  endDate: Date;
  days: boolean[];
  activeDays: Days[];
}

export default HabitModel;
