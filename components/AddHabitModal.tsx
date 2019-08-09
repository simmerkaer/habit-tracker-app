import React, { useState } from "react";
import {
  Button,
  DatePickerAndroid,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import Days from "../models/Days";
import { DateToString, DaysBetween } from "../utils/DateHelpers";

const AddHabitModal = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [days, setDays] = useState<boolean[]>([]);
  const [activeDays, setActiveDays] = useState(new Array(7).fill(true));

  const setStartDateFunction = async () => {
    try {
      const result = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date()
      });

      if ("day" && "month" && "year" in result) {
        const { day, month, year } = result;
        const date = new Date(year, month, day);
        setStartDate(date);
        setHabitDays();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const setEndDateFunction = async () => {
    try {
      const result = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date()
      });

      if ("day" && "month" && "year" in result) {
        const { day, month, year } = result;
        const date = new Date(year, month, day);
        setEndDate(date);
        setHabitDays();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const setHabitDays = () => {
    const amountOfDays = DaysBetween(startDate, endDate);
    setDays(Array(amountOfDays).fill(false));
  };

  const handleWeekdayPress = (index: number) => {
    const newActiveDays = [...activeDays];
    newActiveDays[index] = !newActiveDays[index];
    setActiveDays(newActiveDays);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder="Title"
          />

          <View>
            <Button title="Set start date" onPress={setStartDateFunction} />
            <Text>{DateToString(startDate)}</Text>
          </View>
          <View>
            <Button title="Set end date" onPress={setEndDateFunction} />
            <Text>{DateToString(endDate)}</Text>
          </View>

          <View style={styles.weekdayContainer}>
            {activeDays.map((isActive, index) => (
              <View key={index}>
                <Text>{Days[index].slice(0, 3)}</Text>
                <TouchableHighlight
                  style={styles.weekday}
                  onPress={() => handleWeekdayPress(index)}
                >
                  <View>
                    {isActive && <View style={styles.activeWeekday} />}
                  </View>
                </TouchableHighlight>
              </View>
            ))}
          </View>
          {/* 
          <View>
            <Button title="Add" onPress={() => null} />
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  weekdayContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  weekday: {
    height: 50,
    width: 50,
    backgroundColor: "blue"
  },
  activeWeekday: {
    height: 20,
    width: 20,
    backgroundColor: "red"
  }
});

export default AddHabitModal;
