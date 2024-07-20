import { Inflection } from "@surreptus/japanese-conjugator";

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
  [Inflection.NonPast]: "",
  [Inflection.Passive]: "",
  [Inflection.Causative]: "",
  [Inflection.CausativePassive]: "",
  [Inflection.Imperative]: "",
};

export function getRandomInflection() {
  return SUPPORTED_INFLECTIONS[
    Math.floor(Math.random() * SUPPORTED_INFLECTIONS.length)
  ];
}

export function canBrowserSupportSpeechRecognition() {
  return !!SpeechRecognition && !!SpeechGrammar;
}
