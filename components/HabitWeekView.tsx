import * as React from "react";
import { useEffect, useState } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { HabitDayModel } from "../models/HabitDayModel";
import { GetCurrentWeek, isToday } from "../utils/DateHelpers";
import { getHabitDayStyle, toggleDay } from "../utils/HabitHelpers";
import { getHabitKey } from "../utils/HabitKey";
import HabitModel from "./../models/HabitModel";

interface HabitWeekViewProps {
  habit: HabitModel;
  // onTodayPress: () => void;
}

const HabitWeekView: React.FunctionComponent<HabitWeekViewProps> = ({
  habit
}) => {
  const [days, setDays] = useState<HabitDayModel[]>([]);

  useEffect(() => {
    setDays(habit.days);
  }, [habit.days]);

  const handleDayToggle = () => {
    const newDays = [...days];
    newDays.forEach(day => {
      if (isToday(day.date)) day.status = toggleDay(day.status);
    });

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
      <Text>{habit.title}</Text>
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
