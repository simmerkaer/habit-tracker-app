import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "../hooks/useNavigation";

const HabitOverviewScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Habit details</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("YourDayScreen")}
      />
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

HabitOverviewScreen.navigationOptions = {
  title: "Habit Overview"
};

export default HabitOverviewScreen;
