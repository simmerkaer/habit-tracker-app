import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "../hooks/useNavigation";

const YourDayScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("HabitOverviewScreen")}
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

YourDayScreen.navigationOptions = {
  title: "Your Day"
};
export default YourDayScreen;
