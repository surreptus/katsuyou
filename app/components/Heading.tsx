import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  variant?: "title" | "subtitle";
  children: ReactNode;
}

export default function Heading({ children, variant = "title" }: Props) {
  return <Text style={getStyles(variant)}>{children}</Text>;
}

function getStyles(variant: Props["variant"]) {
  switch (variant) {
    case "title":
      return [styles.heading, styles.title];
    case "subtitle":
      return [styles.heading, styles.subtitle];
  }
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    paddingBottom: 8,
  },
  title: {
    fontSize: 48,
  },
  subtitle: {
    fontSize: 24,
  },
});
