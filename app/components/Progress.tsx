import React from "react";
import { View, StyleSheet, DimensionValue } from "react-native";

interface Props {
  percent: string;
}

export default function Progress({ percent }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.bar, { width: `${percent}%` as DimensionValue }]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgray",
  },
  bar: {
    height: "100%",
    backgroundColor: "orange",
  },
});
