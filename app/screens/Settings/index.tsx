import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Switch,
  View,
} from "react-native";

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View>
        <Text>Setting 1</Text>
        <Switch />
      </View>

      <View>
        <Text>Setting 2</Text>
        <Switch />
      </View>
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
