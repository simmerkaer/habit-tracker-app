export interface HabitDayModel {
  status: DayStatus;
  date: Date;
}

export enum DayStatus {
  Unchecked = "Unchecked",
  Checked = "Checked",
  Missed = "Missed",
  Inactive = "Inactive"
}
