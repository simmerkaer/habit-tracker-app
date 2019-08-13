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
import HabitModel from "../models/HabitModel";
import { DateToString } from "../utils/DateHelpers";
import { DayStatus, HabitDayModel } from "./../models/HabitDayModel";

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (habit: HabitModel) => void;
}

const AddHabitModal: React.FunctionComponent<AddHabitModalProps> = ({
  visible,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [] = useState<boolean[]>([]);
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
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const getDateArray = (startDate: Date, endDate: Date) => {
    const arr = new Array<HabitDayModel>();
    const dt = new Date(startDate);
    while (dt <= endDate) {
      arr.push({
        date: new Date(dt),
        status: activeDays[new Date(dt).getDay()]
          ? DayStatus.Unchecked
          : DayStatus.Inactive
      });
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const handleWeekdayPress = (index: number) => {
    const newActiveDays = [...activeDays];
    newActiveDays[index] = !newActiveDays[index];
    setActiveDays(newActiveDays);
  };

  const handleSubmit = () => {
    const habit: HabitModel = {
      title,
      startDate,
      endDate,
      days: getDateArray(startDate, endDate),
      activeDays
    };

    onSubmit(habit);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
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
                <View>{isActive && <View style={styles.activeWeekday} />}</View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
        <View style={styles.addButton}>
          <Button title="Add" onPress={handleSubmit} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1
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
  },
  addButton: {}
});

export default AddHabitModal;
