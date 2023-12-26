import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    backgroundColor: "orange",
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
  },
});
