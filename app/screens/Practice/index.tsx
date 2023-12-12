import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Chip } from "../../components/Chip";
import verbs from "../../../data/verbs.json";

interface PracticeScreenProps {
  navigation: any;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState(0);

  const isCorrect = value === verbs[current].slug;
  const verb = verbs[current];

  return (
    <View style={styles.container}>
      <Text>{verb.slug}</Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        enterKeyHint="next"
        autoComplete="off"
        autoCapitalize="none"
        style={[styles.input, isCorrect ? styles.valid : styles.invalid]}
        placeholder="Enter the conjugated form"
      />

      <View style={styles.modifiers}>
        <Chip label="Past" />
        <Chip label="Polite" />
      </View>

      {isCorrect && (
        <>
          <Button title="hard" />
          <Button title="easy" />
        </>
      )}
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
  invalid: {
    color: "red",
  },
  valid: {
    color: "green",
  },
});
