import * as React from "react";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  calculateStreak,
  updateHabitInLocalStorage
} from "../AsyncStorageService";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import HabitModel from "../models/HabitModel";
import { toggleDay } from "../utils/HabitHelpers";
import Day from "./Day";

interface HabitProps {
  habit: HabitModel;
  onDelete: (habitTitle: string) => void;
}

const Habit: React.FunctionComponent<HabitProps> = ({ habit, onDelete }) => {
  const [days, setDays] = useState<HabitDayModel[]>([]);

  useEffect(() => {
    setDays(habit.days);
  }, [habit.days]);

  const handleDayToggle = (index: number) => {
    const newDays = [...days];
    newDays[index].status = toggleDay(newDays[index].status);
    setDays(newDays);

    const currentStreak = calculateStreak(newDays);
    updateHabitInLocalStorage(habit.title, {
      days: newDays,
      currentStreak,
      longestStreak:
        habit.longestStreak < currentStreak
          ? currentStreak
          : habit.longestStreak
    });
  };

  const renderFillerDays = () => {
    const startDay = habit.startDate.getDay();
    return [...Array(startDay).keys()].map(i => {
      const date = new Date(habit.startDate.getTime());
      date.setDate(date.getDate() - startDay + i);
      return (
        <Day
          key={i}
          status={DayStatus.Inactive}
          index={i}
          onDayToggle={() => null}
        >
          {date.getDate()}
        </Day>
      );
    });
  };

  return (
    <View style={styles.habitContainer}>
      <View style={styles.habitHeader}>
        <Text>{habit.title}</Text>
        <View style={styles.habitButtons}>
          <Button title="Info" onPress={() => null} />
          <Button title="Delete habit" onPress={() => onDelete(habit.title)} />
        </View>
      </View>
      <View style={styles.dayGrid}>
        {renderFillerDays()}
        {days.map((day, index) => (
          <Day
            key={index}
            status={day.status}
            index={index}
            onDayToggle={handleDayToggle}
          >
            {day.date.getDate()}
          </Day>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20
  },
  habitHeader: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5,
    alignItems: "baseline"
  },
  habitButtons: {
    marginLeft: "auto",
    flexDirection: "row"
  },
  dayGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default Habit;
