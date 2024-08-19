import { inflect, Inflection } from "@surreptus/japanese-conjugator";
import { useCallback, useEffect, useState } from "react";
import { Level, Review } from "../../types";
import { store } from "../../store";
import { SORTED_VERBS } from "./constants";

export const SUPPORTED_INFLECTIONS = [
  Inflection.NonPastPolite,
  Inflection.Past,
  Inflection.PastPolite,
  Inflection.Potential,
  Inflection.Te,
];

export const INFLECTION_TO_LABEL: Record<Inflection, string> = {
  [Inflection.NonPastPolite]: "Present Polite",
  [Inflection.Past]: "Past",
  [Inflection.PastPolite]: "Past Polite",
  [Inflection.Potential]: "Potential",
  [Inflection.Te]: "Te",
  [Inflection.NonPast]: "Present",
  [Inflection.Passive]: "Passive",
  [Inflection.Causative]: "Causative",
  [Inflection.CausativePassive]: "Passive Causative",
  [Inflection.Imperative]: "Imperative",
};

export function getRandomInflection() {
  return SUPPORTED_INFLECTIONS[
    Math.floor(Math.random() * SUPPORTED_INFLECTIONS.length)
  ];
}

export function canBrowserSupportSpeechRecognition() {
  return !!SpeechRecognition && !!SpeechGrammar;
}

export function useReviews() {
  const [current, setCurrent] = useState<Review>();

  const getNextOrGenerate = useCallback(async () => {
    const nextReview = await store.reviews.findNextDue();

    if (nextReview) return nextReview;

    return generateReview();
  }, []);

  useEffect(() => {
    (async () => {
      setCurrent(await getNextOrGenerate());
    })();
  }, [getNextOrGenerate]);

  async function generateReview() {
    for (const verb of SORTED_VERBS) {
      const review = await store.reviews.get(verb.slug);

      if (!review) {
        const inflection = getRandomInflection();

        return {
          slug: verb.slug,
          answer: inflect(verb.slug, inflection),
          prompt: inflection,
          dueDate: new Date(),
          level: Level.Beginner,
        };
      }
    }
  }

  async function progress(review: Review) {
    if (review.dueDate < new Date()) {
      store.reviews.update({
        ...review,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
    }

    setCurrent(await getNextOrGenerate());
  }

  return {
    current,
    progress,
  };
}
