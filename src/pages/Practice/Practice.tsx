import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { inflect } from "@surreptus/japanese-conjugator";
import * as yup from "yup";

import { SORTED_VERBS } from "./constants";
import verbsJson from "../../data/verbs.json";
import { getRandomInflection } from "./helpers";
import { Input } from "../../components/Input";
import { Verb } from "../../types";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Stack } from "../../components/Stack";
import { Container } from "../../components/Container";
import { css } from "@emotion/react";

const verbs: { [key: string]: Verb } = verbsJson;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const completed = [];

interface Lesson {
  slug: string;
  answer: string;
  inflection: string;
}

const INITIAL_VALUES = {
  guess: "",
};

interface FormValues {
  guess: string;
}

function generateLesson() {
  const next = SORTED_VERBS.slice(completed.length)[0];
  const inflection = getRandomInflection();
  completed.push(next.slug);
  return {
    slug: next.slug,
    answer: inflect(next.slug, inflection),
    inflection,
  };
}

/**
 * 
const grammar = `#JSGF V1.0; grammar colors; public <color> = たべました | たべませんでした | たべませんでしたか;`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "ja-JP";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
 */

export function Practice() {
  const [lesson, setLesson] = useState<Lesson>(generateLesson());
  const [results] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /*
    recognition.onresult = (event: any) => {
      const color = event.results[0][0].transcript;
      console.log(color);
      setResults(color);
      console.log(`Confidence: ${event.results[0][0].confidence}`);
    };
    */
  });

  const handleSubmit = (
    _values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setLesson(generateLesson());
    resetForm();
  };

  const schema = yup.object().shape({
    guess: yup.string().trim().matches(RegExp(lesson.answer)).required(),
  });

  return (
    <Container>
      <Formik
        isInitialValid={false}
        validationSchema={schema}
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form>
            <Stack direction="column">
              <Heading>{lesson.slug}</Heading>

              <Text>{verbs[lesson.slug].reading}</Text>

              <Text>
                {lesson.inflection} {results}
              </Text>

              <div>
                <Field
                  lang="ja"
                  name="guess"
                  as={Input}
                  placeholder="食べました"
                  type="text"
                />

                {SpeechRecognition && <button aria-label="Search database" />}
              </div>

              {isValid && <button type="submit">Continue</button>}
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
