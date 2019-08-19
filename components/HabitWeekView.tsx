import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  calculateStreak,
  updateHabitInLocalStorage
} from "../AsyncStorageService";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import { isToday } from "../utils/DateHelpers";
import { getDayStyle, toggleDay } from "../utils/HabitHelpers";
import HabitModel from "./../models/HabitModel";

interface HabitWeekViewProps {
  habit: HabitModel;
}

export const getLastFive = (days: HabitDayModel[]) => {
  const lastFiveArray = [];
  const indexOfToday = days.findIndex(x => isToday(x.date));

  let i;
  for (i = 5; i > 0; i--) {
    const index = indexOfToday - i;
    const status =
      index >= 0 && index < days.length
        ? days[index].status
        : DayStatus.OutOfBound;

    lastFiveArray.push(status);
  }

  return lastFiveArray;
};

const HabitWeekView: React.FunctionComponent<HabitWeekViewProps> = ({
  habit
}) => {
  const [days, setDays] = useState<HabitDayModel[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0); // Can we avoid tracking streak in state?

  useEffect(() => {
    setDays(habit.days);
    setCurrentStreak(habit.currentStreak);
  }, [habit.days, habit.currentStreak]);

  const handleDayToggle = () => {
    const newDays = [...days];
    newDays.forEach(day => {
      if (isToday(day.date)) day.status = toggleDay(day.status);
    });

    const currentStreak = calculateStreak(newDays);

    setDays(newDays);
    setCurrentStreak(currentStreak);
    updateHabitInLocalStorage(habit.title, {
      days: newDays,
      currentStreak,
      longestStreak:
        habit.longestStreak < currentStreak
          ? currentStreak
          : habit.longestStreak
    });
  };

  const today = days.find(x => isToday(x.date));

  return (
    <View key={habit.title} style={styles.habitRow}>
      <Text>
        {habit.title} - Streak: {currentStreak}
      </Text>
      <View style={styles.dayRow}>
        {today && (
          <TouchableHighlight onPress={handleDayToggle}>
            <View style={[styles.todayBox, getDayStyle(today.status)]} />
          </TouchableHighlight>
        )}
        {getLastFive(days)
          .reverse()
          .map((x, i) => (
            <View key={i} style={[styles.notTodayBox, getDayStyle(x)]} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  habitRow: {
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  notTodayBox: {
    height: 20,
    width: 20,
    marginLeft: 5
  },
  todayBox: {
    height: 40,
    width: 40,
    borderColor: "black",
    borderWidth: 2,
    marginLeft: 5
  }
});

export default HabitWeekView;
