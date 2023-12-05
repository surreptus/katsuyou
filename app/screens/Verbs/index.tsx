import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export const VerbsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Verbs</Text>
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
