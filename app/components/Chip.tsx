import React from "react";
import { View, Text, StyleSheet, PlatformColor } from "react-native";

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
    backgroundColor: PlatformColor("systemIndigo"),
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
