import {
  Badge,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Input,
  Progress,
  VStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Mic } from "react-feather";
import { inflect } from "@surreptus/japanese-conjugator";
import * as yup from "yup";

import { SORTED_VERBS } from "./constants";
import verbs from "../../data/verbs.json";
import { getRandomInflection } from "./helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VERBS = verbs as any;

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
    <Container
      display="flex"
      alignItems="center"
      height="100vh"
      size="md"
      justifyContent="center"
    >
      <Formik
        isInitialValid={false}
        validationSchema={schema}
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form>
            <VStack>
              <Tooltip label={VERBS[lesson.slug].reading}>
                <Heading>{lesson.slug}</Heading>
              </Tooltip>

              <Badge>{lesson.inflection}</Badge>

              <Text>{results}</Text>

              <Progress value={10} />

              <HStack>
                <Field
                  lang="ja"
                  as={Input}
                  name="guess"
                  placeholder="食べました"
                />

                {SpeechRecognition && (
                  <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<Mic />}
                  />
                )}
              </HStack>

              {isValid && (
                <Button mt="8" colorScheme="green" type="submit">
                  Continue
                </Button>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
