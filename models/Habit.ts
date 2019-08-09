import Days from "./Days";

interface Habit {
  title: string;
  startDate: Date;
  endDate: Date;
  days: boolean[];
  active: Days[];
}

export default Habit;
