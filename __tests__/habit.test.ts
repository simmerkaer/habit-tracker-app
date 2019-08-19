import moment from "moment";
import { getLastFive } from "../components/HabitWeekView";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
const habitDays: HabitDayModel[] = [
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
    status: DayStatus.Checked
  }
];

describe("getLastFive", () => {
  it("gets the status of the last 5 days", () => {
    const testData = [...habitDays];
    testData[6].date = moment().toDate();
    const lastFive = getLastFive(habitDays);
    expect(lastFive).toHaveLength(5);
  });
  it("still works of array is shorter than 5", () => {
    const testData = [...habitDays];
    testData[2].date = moment().toDate();
    const lastFive = getLastFive(habitDays);
    expect(lastFive).toHaveLength(5);
  });
  it("fills null days with Status.OutOfBound", () => {
    const testData = [...habitDays];
    testData[1].date = moment().toDate();
    const lastFive = getLastFive(habitDays);
    expect(lastFive[0]).toEqual(DayStatus.OutOfBound);
    expect(lastFive[1]).toEqual(DayStatus.OutOfBound);
    expect(lastFive[2]).toEqual(DayStatus.OutOfBound);
    expect(lastFive[3]).toEqual(DayStatus.OutOfBound);
    expect(lastFive[4]).toEqual(DayStatus.Checked);
  });
});
