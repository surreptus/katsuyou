import { FormEvent, useState } from "react";
import { inflect, Inflection } from "@surreptus/japanese-conjugator";

import { SORTED_VERBS } from "./constants";
import { getRandomInflection, INFLECTION_TO_LABEL } from "./helpers";
import { Input } from "../../components/Input";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { VERBS } from "../../data";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { useHistory } from "../../utils/history";
import { Layout } from "../../components/Layout";
import { Stack } from "../../components/Stack";
import styled from "@emotion/styled";

const Content = styled(Stack)`
  padding-top: 2rem;
`;

interface Lesson {
  slug: string;
  answer: string;
  inflection: Inflection;
  dueAt: Date;
}

export function Practice() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [lesson, setLesson] = useState<Lesson>(() => generateLesson());
  const [value, setValue] = useState<string>("");
  const { add } = useHistory();

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
    setValue(event.target.value);

    if (event.target.value === lesson.answer) {
      console.log("Correct!");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    console.log(data);
    if (data.get("guess") === lesson.answer) {
      add(lesson.slug);
      setValue("");
      setCompleted([...completed, lesson.slug]);
      setLesson(generateLesson());
    }
  };

  const isCorrect = value === lesson.answer;

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Progress value={(completed.length / 50) * 100} />

        <Content direction="column">
          <Heading title={VERBS[lesson.slug].reading}>{lesson.slug}</Heading>

          <Text>{INFLECTION_TO_LABEL[lesson.inflection]}</Text>

          <Input
            autoComplete="off"
            value={value}
            lang="ja"
            readOnly={isCorrect}
            onChange={handleChange}
            placeholder="食べた"
            name="guess"
          />

          {isCorrect && <Button type="submit">Next</Button>}
        </Content>
      </form>
    </Layout>
  );
}
