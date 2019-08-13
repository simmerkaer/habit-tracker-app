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

// Stolen from: https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
export function GetCurrentWeek() {
  const currentDate = new Date();
  const week: Date[] = [];

  for (let i = 1; i <= 7; i++) {
    const first = currentDate.getDate() - currentDate.getDay() + i;
    const day = new Date(currentDate.setDate(first));
    week.push(day);
  }

  return week;
}

export function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

export function isSameDay(date1: Date, date2: Date) {
  return date1.toDateString() === date2.toDateString();
}
