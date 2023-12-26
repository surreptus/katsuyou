import React from "react";
import { StyleSheet, Text } from "react-native";

function getStyles(variant: Props["variant"]) {
  switch (variant) {
    case "caption":
      return styles.caption;
    default:
      return styles.body;
  }
}

interface Props {
  children: string;
  variant?: "caption" | "body" | "label";
}

export default function StyledText({ variant = "body", children }: Props) {
  return <Text style={getStyles(variant)}>{children}</Text>;
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
});
