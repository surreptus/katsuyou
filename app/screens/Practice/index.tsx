import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Chip } from "../../components/Chip";
import lessons from "../../../data/lessons.json";
import Heading from "../../components/Heading";

interface PracticeScreenProps {
  navigation: any;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState(0);

  const isCorrect = value === lessons[current].slug;
  const verb = lessons[current];

  function handleNext() {
    setValue("");
    setCurrent(current + 1);
  }

  return (
    <View style={styles.container}>
      <Heading>{verb.slug}</Heading>

      <Text>{verb.senses[0].meanings}</Text>

      <View>
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
      </View>

      {isCorrect && (
        <View style={styles.difficulty}>
          <Button color="red" onPress={handleNext} title="hard" />
          <Button color="green" onPress={handleNext} title="easy" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: "#f7f7f7",
    alignItems: "stretch",
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
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.16)",
    borderRadius: 5,
  },
  invalid: {
    color: "red",
  },
  valid: {
    color: "green",
  },
  difficulty: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
