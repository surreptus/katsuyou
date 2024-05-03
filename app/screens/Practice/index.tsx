import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Chip } from "../../components/Chip";
import Heading from "../../components/Heading";
import { Formik, FormikHelpers } from "formik";
import Text from "../../components/Text";
import * as yup from "yup";
import { useLessons } from "./helpers";
import Progress from "../../components/Progress";
import { NavigationAction } from "@react-navigation/native";

interface FormValues {
  guess: string;
}

interface PracticeScreenProps {
  navigation: NavigationAction;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const { currentLesson, getNextLesson } = useLessons();
  const [progress, setProgress] = useState(0);

  function handleSubmit(formValues, { resetForm }: FormikHelpers<FormValues>) {
    resetForm();
    setProgress(progress + 1);
  }

  const reading = currentLesson.japanese[0].reading;

  return (
    <View style={styles.container}>
      <Progress percent={`${Math.round((progress / 25) * 100)}`} />

      <View>
        <Heading>{currentLesson.slug}</Heading>
        <Text>{reading}</Text>

        <View style={styles.modifiers}>
          <Chip label="Past" />
          <Chip label="Polite" />
        </View>
      </View>

      <Text>{currentLesson.senses[0].english_definitions} </Text>

      <Formik
        enableReinitialize
        initialValues={{ guess: "" }}
        validationSchema={yup.object({
          guess: yup
            .string()
            .matches(new RegExp(currentLesson.slug), "Must match")
            .required(),
        })}
        onSubmit={handleSubmit}
      >
        {({
          isValid,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange("guess")}
              onBlur={handleBlur("guess")}
              value={values.guess}
              autoCorrect={false}
              placeholder="Guess"
              enterKeyHint="next"
              autoComplete="off"
              autoCapitalize="none"
              style={[styles.input, isValid ? styles.valid : styles.invalid]}
            />

            <View style={styles.difficulty}>
              {dirty && isValid && (
                <>
                  <Button
                    color="red"
                    onPress={handleSubmit as any}
                    title="Hard"
                  />
                  <Button title="Definition" />
                  <Button
                    color="green"
                    onPress={handleSubmit as any}
                    title="Easy"
                  />
                </>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: "stretch",
    paddingTop: "20%",
    padding: 8,
    justifyContent: "flex-start",
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
    height: 140,
    justifySelf: "flex-end",
    flexDirection: "row",
  },
});
