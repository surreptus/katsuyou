import React from "react";
import { View, StyleSheet } from "react-native";

interface StackProps {
  children: React.ReactNode;
  gap?: number;
}

const Stack: React.FC<StackProps> = ({ children, gap = 10 }) => {
  return (
    <View style={[styles.container, { gap }]}>
      {React.Children.map(children, (child, index) => (
        <View style={[styles.item]}>{child}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  item: {
    flex: 1,
  },
});

export default Stack;
