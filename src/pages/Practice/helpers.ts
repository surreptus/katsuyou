import { Inflection } from "@surreptus/japanese-conjugator";

const SUPPORTED_INFLECTIONS = [
  Inflection.NonPastPolite,
  Inflection.Past,
  Inflection.PastPolite,
  Inflection.Potential,
  Inflection.Te,
];

export function getRandomInflection() {
  return SUPPORTED_INFLECTIONS[
    Math.floor(Math.random() * SUPPORTED_INFLECTIONS.length)
  ];
}
