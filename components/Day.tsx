import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { COLORS } from "../contants";
import { DayStatus } from "../models/HabitDayModel";
import { getDayStyle } from "../utils/HabitHelpers";

interface DayProps {
  index: number;
  status: DayStatus;
  onDayToggle: (index: number) => void;
}

const Day: React.FunctionComponent<DayProps> = ({
  children,
  index,
  status,
  onDayToggle
}) => {
  const handlePress = () => onDayToggle(index);

  return (
    <TouchableHighlight
      style={[styles.square, getDayStyle(status)]}
      onPress={handlePress}
    >
      <View style={styles.dayContainer}>
        <Text style={styles.dateContainer}>{children}</Text>
        <View style={styles.crossContainer}>
          {status === DayStatus.Checked && (
            <Ionicons name="md-close" size={30} />
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    alignItems: "center"
  },
  dateContainer: {
    flex: 1
  },
  crossContainer: {
    flex: 2
  },
  square: {
    height: 50,
    margin: 0,
    width: "14.28%",
    borderColor: COLORS.gunmetal,
    borderWidth: 1
  }
});
export default Day;
