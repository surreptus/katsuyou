import { FormEvent, useEffect, useState } from "react";
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
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { ArrowRight } from "react-feather";
import styled from "@emotion/styled";

const GuessContainer = styled.div`
  position: relative;
  ${Input} {
    padding-right: 3rem;
  }
  ${Button} {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    text-align: center;
  }
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const Content = styled(Stack)`
  text-align: center;
`;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

interface Lesson {
  slug: string;
  answer: string;
  inflection: string;
  dueAt: Date;
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
  const [completed, setCompleted] = useState<string[]>([]);
  const [lesson, setLesson] = useState<Lesson>(() => generateLesson());
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

  function generateLesson() {
    const next = SORTED_VERBS.slice(completed.length)[0];
    const inflection = getRandomInflection();
    return {
      slug: next.slug,
      answer: inflect(next.slug, inflection),
      inflection,
      dueAt: new Date(),
    };
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(toHiragana(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (data.get("guess") === lesson.answer) {
      setValue("");
      setCompleted([...completed, lesson.slug]);
      setLesson(generateLesson());
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Content direction="column">
          <Progress value={(completed.length / 50) * 100} />

          <Heading title={VERBS[lesson.slug].reading}>{lesson.slug}</Heading>

          <Text>
            {lesson.inflection} {results}
          </Text>

          <GuessContainer>
            <Input
              autoComplete="off"
              value={value}
              lang="ja"
              onChange={handleChange}
              name="guess"
            />

            <Button disabled={value === ""} type="submit">
              <ArrowRight />
            </Button>

            {SpeechRecognition && <button aria-label="Speak" />}
          </GuessContainer>
        </Content>
      </form>
    </Container>
  );
}
