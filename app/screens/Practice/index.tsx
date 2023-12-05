import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Chip } from "../../components/Chip";

interface PracticeScreenProps {
  navigation: any;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text>this is the home screen</Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        enterKeyHint="next"
        autoComplete="off"
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter the conjugated form"
      />

      <View style={styles.modifiers}>
        <Chip label="Past" />
        <Chip label="Polite" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  modifiers: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    paddingTop: 16,
  },
  chip: {
    borderRadius: 50,
    backgroundColor: "orange",
    paddingHorizontal: 12,
  },
  input: {
    padding: 8,
    fontSize: 32,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.16)",
    borderRadius: 5,
  },
});
