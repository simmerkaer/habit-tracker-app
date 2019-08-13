import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDailyHabits } from "../hooks/useDailyHabits";
import { DayStatus, HabitDayModel } from "../models/HabitDayModel";
import { GetCurrentWeek, isSameDay, isToday } from "../utils/DateHelpers";
import { dayStyles } from "./../components/Day";

const YourDayScreen = () => {
  const [dailyHabits] = useDailyHabits();

  const getHabitDayStyle = (habitDays: HabitDayModel[], dayOfWeek: Date) => {
    const day = habitDays.find(habitDay => isSameDay(habitDay.date, dayOfWeek));
    if (!day) return dayStyles.inactiveBox;
    if (day.status === DayStatus.Inactive) return dayStyles.inactiveBox;
    if (day.status === DayStatus.Unchecked) return dayStyles.uncheckedBox;
    if (day.status === DayStatus.Checked) return dayStyles.checkedBox;
    return dayStyles.missedBox;
  };

  return (
    <View style={styles.container}>
      <Text>Your daily habits</Text>
      {dailyHabits.map(habit => (
        <View key={habit.title} style={styles.habitRow}>
          <Text>{habit.title}</Text>
          <View style={styles.dayRow}>
            {GetCurrentWeek().map((dayOfWeek, index) => (
              <View
                key={index}
                style={[
                  isToday(dayOfWeek) ? styles.todayBox : styles.notTodayBox,
                  getHabitDayStyle(habit.days, dayOfWeek)
                ]}
              />
            ))}
          </View>
        </View>
      ))}
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

YourDayScreen.navigationOptions = {
  title: "Your Day"
};
export default YourDayScreen;
