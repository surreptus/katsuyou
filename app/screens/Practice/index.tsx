import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Chip } from "../../components/Chip";
import Heading from "../../components/Heading";
import { Formik, FormikHelpers } from "formik";
import Text from "../../components/Text";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { getNextLesson } from "./helpers";

interface FormValues {
  guess: string;
}

interface PracticeScreenProps {
  navigation: any;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(getNextLesson());

  function handleSubmit(formValues, { resetForm }: FormikHelpers<FormValues>) {
    resetForm();
    setCurrent(getNextLesson());
  }

  return (
    <View style={styles.container}>
      <View>
        <Heading>{current.slug}</Heading>

        <View style={styles.modifiers}>
          <Chip label="Past" />
          <Chip label="Polite" />
        </View>
      </View>

      <Text>{current.senses[0].meanings.join(", ")} </Text>

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

            <Button title={t("Get Hint")} />

            <View style={styles.difficulty}>
              {dirty && isValid && (
                <>
                  <Button
                    color="red"
                    onPress={handleSubmit as any}
                    title={t("Hard")}
                  />
                  <Button title="Definition" />
                  <Button
                    color="green"
                    onPress={handleSubmit as any}
                    title={t("Easy")}
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
