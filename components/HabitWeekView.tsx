import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  calculateStreak,
  updateHabitDaysInLocalStorage
} from "../AsyncStorageService";
import { HabitDayModel } from "../models/HabitDayModel";
import { GetCurrentWeek, isToday } from "../utils/DateHelpers";
import { getHabitDayStyle, toggleDay } from "../utils/HabitHelpers";
import HabitModel from "./../models/HabitModel";

interface HabitWeekViewProps {
  habit: HabitModel;
  // onTodayPress: () => void;
}

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

    setDays(newDays);
    setCurrentStreak(calculateStreak(newDays));
    updateHabitDaysInLocalStorage(habit.title, newDays);
  };

  const renderToday = (index: number, dayOfWeek: Date) => (
    <TouchableHighlight
      key={index}
      onPress={handleDayToggle}
      style={[styles.todayBox, getHabitDayStyle(days, dayOfWeek)]}
    />
  );

  const renderNotToday = (key: number, dayOfWeek: Date) => (
    <View
      key={key}
      style={[styles.notTodayBox, getHabitDayStyle(days, dayOfWeek)]}
    />
  );

  return (
    <View key={habit.title} style={styles.habitRow}>
      <Text>
        {habit.title} - Streak: {currentStreak}
      </Text>
      <View style={styles.dayRow}>
        {GetCurrentWeek().map((dayOfWeek, index) =>
          isToday(dayOfWeek)
            ? renderToday(index, dayOfWeek)
            : renderNotToday(index, dayOfWeek)
        )}
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
