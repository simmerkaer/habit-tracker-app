import * as React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
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
      <Text>{children}</Text>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  square: {
    height: 50,
    margin: 0,
    width: "14.28%",
    borderColor: "white",
    borderWidth: 1
  },
  touchable: {
    height: 50,
    flexDirection: "row"
  }
});

export const dayStyles = StyleSheet.create({
  inactiveBox: {
    backgroundColor: "grey"
  },
  checkedBox: {
    backgroundColor: "green"
  },
  uncheckedBox: {
    backgroundColor: "red"
  },
  missedBox: {
    backgroundColor: "yellow"
  }
});
export default Day;
