import * as React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AddHabitModal from "../components/AddHabitModal";

const HabitOverviewScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState([]);

  return (
    <View style={styles.container}>
      <Text>Habit details</Text>
      <Button title="Add habit" onPress={() => setShowModal(true)} />
      <AddHabitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => null}
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
  title: "Habit Overview",
  headerTitle: "Test"
};

export default HabitOverviewScreen;
