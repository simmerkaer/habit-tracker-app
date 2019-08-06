import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const HabitDetail = () => {
  return (
    <View style={styles.container}>
      <Text>Habit details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

HabitDetail.navigationOptions = {
  title: "Habit Details"
};

export default HabitDetail;
