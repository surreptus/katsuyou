import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    flex: 1,
  },
  heading: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
});
