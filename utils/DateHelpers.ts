export function DateToString(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function DaysBetween(date1: Date, date2: Date) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return Math.round(difference_ms / ONE_DAY);
}
