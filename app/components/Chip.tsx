import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <View style={styles.chip}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    backgroundColor: "orange",
    paddingHorizontal: 12,
  },
});
