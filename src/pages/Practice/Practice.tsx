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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Mic } from "react-feather";
import { inflect, Inflection } from "@surreptus/japanese-conjugator";
import * as yup from "yup";

import { SORTED_VERBS } from "./constants";
import verbs from "../../data/verbs.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VERBS = verbs as any;

const completed = [];

interface Lesson {
  slug: string;
  answer: string;
}

const INITIAL_VALUES = {
  guess: "",
};

interface FormValues {
  guess: string;
}

function generateLesson() {
  const next = SORTED_VERBS.slice(completed.length)[0];
  completed.push(next.slug);
  return {
    slug: next.slug,
    answer: inflect(next.slug, Inflection.Past),
  };
}

export function Practice() {
  const [lesson, setLesson] = useState<Lesson>(generateLesson());

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    setLesson(generateLesson());
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
              <Heading>{lesson.slug}</Heading>

              <Text>
                {Inflection.Past} {VERBS[lesson.slug].reading}
              </Text>

              <Badge colorScheme="green">Verb</Badge>

              <Progress value={10} />

              <HStack>
                <Field
                  lang="ja"
                  as={Input}
                  name="guess"
                  placeholder="食べました"
                />

                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<Mic />}
                />
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
