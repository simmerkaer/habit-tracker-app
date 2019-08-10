import Days from "./Days";

interface Habit {
  title: string;
  startDate: Date;
  endDate: Date;
  days: boolean[];
  activeDays: Days[];
}

export default Habit;
