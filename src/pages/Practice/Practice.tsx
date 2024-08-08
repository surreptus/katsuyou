import { FormEvent, useState } from "react";
import { inflect, Inflection } from "@surreptus/japanese-conjugator";
import styled from "@emotion/styled";

import { SORTED_VERBS } from "./constants";
import { getRandomInflection, INFLECTION_TO_LABEL } from "./helpers";
import { Input } from "../../components/Input";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Stack } from "../../components/Stack";
import { Container } from "../../components/Container";
import { VERBS } from "../../data";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { ArrowRight } from "react-feather";
import { useHistory } from "../../utils/history";

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
  padding-top: 10vh;
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
  const { history, add } = useHistory();

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
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (data.get("guess") === lesson.answer) {
      add(lesson.slug);
      setValue("");
      setCompleted([...completed, lesson.slug]);
      setLesson(generateLesson());
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Progress value={(completed.length / 50) * 100} />

        <Content direction="column">
          <Heading title={VERBS[lesson.slug].reading}>{lesson.slug}</Heading>

          <Text>{INFLECTION_TO_LABEL[lesson.inflection]}</Text>

          <GuessContainer>
            <Input
              autoComplete="off"
              value={value}
              lang="ja"
              onChange={handleChange}
              placeholder="食べた"
              name="guess"
            />

            <Button disabled={value === ""} type="submit">
              <ArrowRight />
            </Button>
          </GuessContainer>
        </Content>
      </form>
    </Container>
  );
}
