import { FormEvent, useState } from "react";
import { inflect } from "@surreptus/japanese-conjugator";

import { INFLECTION_TO_LABEL, useReviews } from "./helpers";
import { Progress } from "../../components/Progress";
import { Layout } from "../../components/Layout";

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

        <div className="flex content-center text-center flex-col pt-4">
          <h1>{reviews.current.slug}</h1>

          <p className="text-3xl font-bold underline">
            {INFLECTION_TO_LABEL[reviews.current.prompt]}
          </p>

          <input
            autoComplete="off"
            value={value}
            lang="ja"
            required
            pattern={answer}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            placeholder="食べた"
            name="guess"
          />

          {isCorrect && <button type="submit">Next</button>}
        </div>
      </form>
    </Layout>
  );
}
