import * as React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

interface DayProps {
  index: number;
  active: boolean;
  onDayToggle: (index: number) => void;
}

const Day: React.FunctionComponent<DayProps> = ({
  children,
  index,
  active,
  onDayToggle
}) => {
  const handlePress = () => onDayToggle(index);

  return (
    <TouchableHighlight
      style={[styles.square, active ? styles.squareOn : styles.squareOff]}
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
  },
  squareOn: {
    backgroundColor: "green"
  },
  squareOff: {
    backgroundColor: "red"
  }
});
export default Day;
