import moment from "moment";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import { getLastFiveHabitDays } from "../utils/HabitHelpers";
const habitDays: HabitDayModel[] = [
  {
    date: moment()
      .add(-8, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Inactive
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Inactive
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  },
  {
    date: moment()
      .add(-100, "day")
      .toDate(),
    status: DayStatus.Checked
  }
];

describe("getLastFiveHabitDays", () => {
  it("gets the status of the last 5 days active days", () => {
    const testData = [...habitDays];
    testData[8].date = moment().toDate();
    const lastFive = getLastFiveHabitDays(testData);
    expect(lastFive).toHaveLength(5);
  });
  it("returns 5 statuses even if it's first day of habit", () => {
    const testData = [...habitDays];
    testData[2].date = moment().toDate();
    const lastFive = getLastFiveHabitDays(testData);
    expect(lastFive).toHaveLength(5);
  });
  it("return Status.OutOfBound for days before habit started", () => {
    const testData = [...habitDays];
    testData[1].date = moment().toDate();
    const lastFive = getLastFiveHabitDays(testData);
    expect(lastFive).toEqual([
      DayStatus.Checked,
      DayStatus.OutOfBound,
      DayStatus.OutOfBound,
      DayStatus.OutOfBound,
      DayStatus.OutOfBound
    ]);
  });
});
