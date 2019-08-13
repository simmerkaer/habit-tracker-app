export interface HabitDayModel {
  status: DayStatus;
  date: Date;
}

export enum DayStatus {
  Unchecked,
  Checked,
  Missed,
  Inactive
}
