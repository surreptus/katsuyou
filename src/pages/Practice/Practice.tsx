import { FormEvent, useState } from "react";
import { inflect } from "@surreptus/japanese-conjugator";

import { INFLECTION_TO_LABEL, useReviews } from "./helpers";
import { Input } from "../../components/Input";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { VERBS } from "../../data";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { Layout } from "../../components/Layout";
import { Stack } from "../../components/Stack";
import styled from "@emotion/styled";

const Content = styled(Stack)`
  padding-top: 2rem;
`;

export function Practice() {
  const [completed, setCompleted] = useState<number>(0);
  const reviews = useReviews();
  const [value, setValue] = useState<string>("");

  if (!reviews.current) return null;

  const answer = inflect(reviews.current.slug, reviews.current.prompt);
  const isCorrect = value === answer;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    if (data.get("guess") === answer) {
      setValue("");
      setCompleted(completed + 1);
      await reviews.progress(reviews.current!);
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Progress value={(completed / 50) * 100} />

        <Content direction="column">
          <Heading title={VERBS[reviews.current.slug].reading}>
            {reviews.current.slug}
          </Heading>

          <Text>{INFLECTION_TO_LABEL[reviews.current.prompt]}</Text>

          <Input
            autoComplete="off"
            value={value}
            lang="ja"
            readOnly={isCorrect}
            required
            pattern="食べる"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            placeholder="食べた"
            name="guess"
          />

          {isCorrect && <Button type="submit">Next</Button>}
        </Content>
      </form>
    </Layout>
  );
}
