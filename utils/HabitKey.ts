import { HABIT_KEY_PREFIX } from "../contants";

export const getHabitKey = (habitTitle: string) => {
  const titleWithUnderscores = habitTitle.replace(/\s+/g, "_"); // Convert spaces to underscores
  return HABIT_KEY_PREFIX + titleWithUnderscores;
};
