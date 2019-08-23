import * as React from "react";
import { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { storeHabitInLocalStorage } from "../AsyncStorageService";
import AddHabitModal from "../components/AddHabitModal";
import { COLORS } from "../contants";
import { useHabits } from "../hooks/useHabits";
import { useNavigation } from "../hooks/useNavigation";
import HabitModel from "../models/HabitModel";
import { getHabitKey } from "../utils/HabitKey";
import HabitComponent from "./../components/Habit";

const HabitOverviewScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useHabits();
  const navigation = useNavigation();

  const handleSubmitHabit = (habit: HabitModel) => {
    storeHabitInLocalStorage(habit);
    setHabits([...habits, habit]);
  };

  const handleDelete = async (habitTitle: string) => {
    const habitKey = getHabitKey(habitTitle);
    await AsyncStorage.removeItem(habitKey);

    const newHabits = habits.filter(habit => habit.title !== habitTitle);
    setHabits(newHabits);
  };

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    navigation.setParams({ openModal });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 10 }}>
        <View style={styles.habitsContainer}>
          {habits.map(habit => (
            <HabitComponent
              key={habit.title}
              habit={habit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>
      <AddHabitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2B2D42"
  },
  habitsContainer: {
    flex: 1,
    flexDirection: "column"
  }
});

HabitOverviewScreen.navigationOptions = ({
  navigation
}: {
  navigation: any;
}) => {
  return {
    title: "Habit Overview2",
    headerTitle: "All habits",
    headerStyle: {
      backgroundColor: COLORS.gunmetal
    },
    headerTintColor: COLORS.offwhite,
    headerRight: (
      <Button
        title="Add habit"
        onPress={navigation.getParam("openModal")}
        color={COLORS.grayblue}
      />
    )
  };
};

export default HabitOverviewScreen;
