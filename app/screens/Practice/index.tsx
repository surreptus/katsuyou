import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Chip } from "../../components/Chip";
import Heading from "../../components/Heading";
import { Formik, FormikHelpers } from "formik";
import Text from "../../components/Text";
import * as yup from "yup";
import { getNextLesson } from "./helpers";
import Progress from "../../components/Progress";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Lesson } from "../../types";
import verbs from "../../data/verbs.json";

/**
 * lessons are a unit of conjugation practice. they include a the base verb, the inflection,
 * level of familiarity, and due date.
 *
 * @returns
 */
function useLessons() {
  const [lessons, setLessons] = useState([]);
  const { getItem, setItem } = useAsyncStorage("@lessons");

  useEffect(() => {
    async function fetchLessons() {
      const data = await getItem();

      setLessons(data ? JSON.parse(data) : []);
    }
  }, []);

  function findNextOverdueLesson(lessons: Lesson[]) {
    return lessons.find((lesson) => new Date(lesson.dueAt) <= new Date());
  }

  function getNextLessonFromVerbs() {
    return verbs.find((verb) => {
      const alreadyLearning = lessons.find(
        (lesson) => lesson.slug === verb.slug
      )!!;

      return;
    });
  }

  function getNextLesson() {
    return findNextOverdueLesson(lessons) ?? getNextLessonFromVerbs();
  }

  return { getNextLesson };
}

interface FormValues {
  guess: string;
}

interface PracticeScreenProps {
  navigation: any;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const [current, setCurrent] = useState(getNextLesson());

  function handleSubmit(formValues, { resetForm }: FormikHelpers<FormValues>) {
    resetForm();
    setCurrent(getNextLesson());
  }

  return (
    <View style={styles.container}>
      <Progress percent="90" />

      <View>
        <Heading>{current.slug}</Heading>

        <View style={styles.modifiers}>
          <Chip label="Past" />
          <Chip label="Polite" />
        </View>
      </View>

      <Text>{current.senses[0].english_definitions} </Text>

      <Formik
        enableReinitialize
        initialValues={{ guess: "" }}
        validationSchema={yup.object({
          guess: yup
            .string()
            .matches(new RegExp(current.slug), "Must match")
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

            <Button title="Get Hint" />

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
    height: 140,
    justifySelf: "flex-end",
    flexDirection: "row",
  },
});
