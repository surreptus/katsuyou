import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  size?: "title" | "subtitle";
  children: string;
}

export default function Heading({ children, size = "title" }: Props) {
  return <Text style={styles.heading}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
