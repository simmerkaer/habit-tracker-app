import * as React from "react";
import { useEffect, useState } from "react";
import { AsyncStorage, Button, StyleSheet, Text, View } from "react-native";
import { HabitDayModel } from "../models/HabitDayModel";
import HabitModel from "../models/HabitModel";
import { toggleDay } from "../utils/HabitHelpers";
import { getHabitKey } from "../utils/HabitKey";
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
    updateHabitInLocalStorage(newDays);
  };

  const updateHabitInLocalStorage = async (days: HabitDayModel[]) => {
    try {
      const updatedHabit: HabitModel = {
        ...habit,
        days
      };

      await AsyncStorage.setItem(
        getHabitKey(habit.title),
        JSON.stringify(updatedHabit)
      );
    } catch (error) {
      console.log(error);
    }
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
