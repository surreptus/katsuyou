import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  InputAccessoryView,
  TouchableOpacity,
} from "react-native";
import { Chip } from "../../components/Chip";
import Heading from "../../components/Heading";
import { Formik, FormikHelpers } from "formik";
import Text from "../../components/Text";
import * as yup from "yup";
import { useLessons } from "./helpers";
import Progress from "../../components/Progress";
import { NavigationAction } from "@react-navigation/native";
import { theme } from "../../theme";
import verbs from "../../data/verbs.json";
import { Verb } from "../../types";
import Voice, {
  type SpeechEndEvent,
  type SpeechErrorEvent,
  type SpeechResultsEvent,
  type SpeechStartEvent,
} from "@react-native-voice/voice";
import { inflect } from "../../utilities/conjugator";

interface FormValues {
  guess: string;
}

interface PracticeScreenProps {
  navigation: NavigationAction;
}

export const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const { currentLesson, progressLesson } = useLessons();
  const [progress, setProgress] = useState(0);
  const [isRecognitionEnable, setRecognitionEnable] = useState(false);
  const [isMicActive, setMicActive] = useState(false);
  const [value, setValue] = useState("");

  const startRecognition = useCallback(
    async () => await Voice.start("pt-BR"),
    []
  );

  const cancelRecognition = useCallback(async () => await Voice.cancel(), []);

  const stopRecognition = useCallback(async () => await Voice.stop(), []);

  const onSpeechStart = (event: SpeechStartEvent) => setMicActive(true);

  const onSpeechResults = (event: SpeechResultsEvent) => {
    const value = event.value?.shift();
    if (!value) return;
    setValue(value);
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    console.error(event.error);
    setMicActive(false);
  };

  const onSpeechEnd = (event: SpeechEndEvent) => setMicActive(false);

  const getSpeechRecognitionServices = useCallback(async () => {
    try {
      const recognitionServices = await Voice.getSpeechRecognitionServices();

      const hasRecognitionServices =
        Array.isArray(recognitionServices) && recognitionServices.length > 0;

      setRecognitionEnable(hasRecognitionServices);
    } catch (error) {
      setRecognitionEnable(false);
      console.error(error);
    }
  }, []);

  const createListeners = useCallback(async () => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;
  }, []);

  const removeListeners = useCallback(async () => {
    await Voice.destroy();
    Voice.removeAllListeners();
  }, []);

  useEffect(() => {
    getSpeechRecognitionServices().then(createListeners);
    return () => {
      removeListeners();
    };
  }, []);

  function handleSubmit(formValues, { resetForm }: FormikHelpers<FormValues>) {
    resetForm();
    setProgress(progress + 1);
  }

  const verb = verbs[currentLesson] as Verb;

  return (
    <Formik
      enableReinitialize
      initialValues={{ guess: "" }}
      validationSchema={yup.object({
        guess: yup.string().required(),
      })}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <KeyboardAvoidingView behavior="height" style={styles.container}>
            <Progress percent={`${Math.round((progress / 25) * 100)}`} />

            <View>
              <Heading>{currentLesson}</Heading>
              <Text>{verb.reading}</Text>

              <View style={styles.modifiers}>
                <Chip label="Past" />
                <Chip label="Polite" />
              </View>
            </View>

            <Text>{verb.senses[0].definitions}</Text>
            <View>
              <TextInput
                inputAccessoryViewID="guess"
                onChangeText={handleChange("guess")}
                onBlur={handleBlur("guess")}
                value={values.guess}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Guess"
                inputMode="text"
                keyboardAppearance="default"
                keyboardType="visible-password"
                style={[styles.input, isValid ? styles.valid : styles.invalid]}
              />
            </View>
          </KeyboardAvoidingView>
          <InputAccessoryView backgroundColor="#222" nativeID="guess">
            <View style={styles.accessory}>
              <Button title="Clear" />

              {!isValid && <Button title="Get Hint" />}

              {isValid && (
                <View style={styles.difficulty}>
                  {dirty && isValid && (
                    <>
                      <Button
                        color="red"
                        onPress={handleSubmit as any}
                        title="Hard"
                      />
                      <Button
                        color="green"
                        onPress={handleSubmit as any}
                        title="Easy"
                      />
                    </>
                  )}
                </View>
              )}

              <TouchableOpacity
                disabled={!isRecognitionEnable}
                onPress={isMicActive ? stopRecognition : startRecognition}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: !isRecognitionEnable ? "#333" : "#fff",
                }}
              >
                {isMicActive ? (
                  <Text>Stop Recording</Text>
                ) : (
                  <Text>Start recording</Text>
                )}
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </>
      )}
    </Formik>
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
  accessory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: theme.dark.danger,
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
    color: theme.dark.danger,
  },
  valid: {
    color: theme.dark.success,
  },
  difficulty: {
    flexDirection: "row",
  },
});
