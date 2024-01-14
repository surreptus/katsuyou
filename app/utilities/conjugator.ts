import { Verb } from "../types";

/**
Affirmative 	Negative
Non-past 	食べる 	食べない
Non-past, polite 	食べます 	食べません
Past 	食べた 	食べなかった
Past, polite 	食べました 	食べませんでした
Te-form 	食べて 	食べなくて
Potential 	食べられる 	食べられない
Passive 	食べられる 	食べられない
Causative 	食べさせる 	食べさせない
Causative Passive 	食べさせられる 	食べさせられない
Imperative 	食べろ 	食べるな
 */

interface Lesson {
  slug: string;
  answer: string;
  family: "ichidan" | "godan" | "irregular";
  inflection: Inflection;
  isNegative: boolean;
}

export type Inflection =
  | "non-past"
  | "non-past-polite"
  | "past"
  | "past-polite"
  | "te"
  | "potential"
  | "passive"
  | "causative"
  | "causative-passive"
  | "imperative";

/**
 * to get the verb stem we must check if it is an irregular verb
 * if it is reuturn the exception
 * if it is not we must check if it is a godan or ichidan verb
 * if it is a godan verb we must remove the last character and add the correct character
 *
 * @param verb
 * @returns
 */
function getVerbStem(verb: Verb): string {
  if (verb.slug === "する") {
    return "し";
  } else if (verb.slug === "くる") {
    return "き";
  }

  if (verb.family === "ichidan") {
    return verb.slug.slice(0, -1);
  }

  const lastCharacter = verb.slug.slice(-1);

  switch (lastCharacter) {
    case `う`:
      return `い`;
    case `く`:
      return `き`;
    case `す`:
      return `し`;
    case `つ`:
      return `ち`;
    case `ぬ`:
      return `に`;
    case `ぶ`:
      return `び`;
    case `む`:
      return `み`;
    case `る`:
      return `り`;
    case `ぐ`:
      return `ぎ`;
    default:
      return verb.slug;
  }
}

function conjugate(
  verb: Verb,
  inflection: Inflection,
  isNegative: boolean
): string {
  switch (inflection) {
    case "non-past":
      return verb.slug;
    case "non-past-polite":
      return getVerbStem(verb) + "ます";
    case "past":
      return getVerbStem(verb) + "た";
    case "past-polite":
      return getVerbStem(verb) + "ました";
    case "te":
      return getVerbStem(verb) + "て";
    case "potential":
      return getVerbStem(verb) + "られる";
    case "passive":
      return getVerbStem(verb) + "られる";
    case "causative":
      return getVerbStem(verb) + "させる";
    case "causative-passive":
      return getVerbStem(verb) + "させられる";
    case "imperative":
      return getVerbStem(verb) + "ろ";
  }
}

function makeNegative(verb: Verb) {
  if (verb.slug === "する") {
    return "しない";
  } else if (verb.slug === "くる") {
    return "こない";
  }

  if (verb.family === "ichidan") {
    return verb.slug.slice(0, -1);
  }

  const lastCharacter = verb.slug.slice(-1);
}
