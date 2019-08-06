import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "../hooks/useNavigation";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

HomeScreen.navigationOptions = {
  title: "HomeScreen"
};
export default HomeScreen;
