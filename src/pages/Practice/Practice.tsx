import { useEffect, useState } from "react";
import { inflect } from "@surreptus/japanese-conjugator";

import { SORTED_VERBS } from "./constants";
import { getRandomInflection } from "./helpers";
import { Input } from "../../components/Input";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Stack } from "../../components/Stack";
import { Container } from "../../components/Container";
import { VERBS } from "../../data";
import { toHiragana } from "wanakana";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const completed = [];

interface Lesson {
  slug: string;
  answer: string;
  inflection: string;
  dueAt: Date;
}

function generateLesson() {
  const next = SORTED_VERBS.slice(completed.length)[0];
  const inflection = getRandomInflection();
  completed.push(next.slug);
  return {
    slug: next.slug,
    answer: inflect(next.slug, inflection),
    inflection,
    dueAt: new Date(),
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
  const [lesson] = useState<Lesson>(() => generateLesson());
  const [value, setValue] = useState<string>("");
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(toHiragana(value));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*
  const _handleSubmit = (formData: FormData) => {
    console.log(formData);
    setLesson(generateLesson());
  };
  */

  return (
    <Container>
      <Stack direction="column">
        <Heading>{lesson.slug}</Heading>

        <Text>{VERBS[lesson.slug].reading}</Text>

        <Text>
          {lesson.inflection} {results}
        </Text>

        <div>
          <Input
            value={value}
            isValid
            lang="ja"
            onChange={handleChange}
            name="guess"
          />

          {SpeechRecognition && <button aria-label="Search database" />}
        </div>

        {value === lesson.answer && (
          <>
            <Text>Correct!</Text>
            <button type="submit">Continue</button>
          </>
        )}
      </Stack>
    </Container>
  );
}
