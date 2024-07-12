import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { inflect } from "@surreptus/japanese-conjugator";
import * as yup from "yup";

import { SORTED_VERBS } from "./constants";
import verbsJson from "../../data/verbs.json";

interface Verb {
  level: number;
  slug: string;
  group: string;
  reading: string;
  jlpt: string;
  kana: boolean;
  definitions: string[];
}

const verbs: { [key: string]: Verb } = verbsJson;
import { getRandomInflection } from "./helpers";

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
    <div>
      <Formik
        isInitialValid={false}
        validationSchema={schema}
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form>
            <div>
              <h1>{lesson.slug}</h1>

              <p>{verbs[lesson.slug].reading}</p>

              <p>{lesson.inflection}</p>

              <p>{results}</p>

              <div>
                <Field
                  lang="ja"
                  name="guess"
                  placeholder="食べました"
                  type="text"
                />

                {SpeechRecognition && <button aria-label="Search database" />}
              </div>

              {isValid && <button type="submit">Continue</button>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
