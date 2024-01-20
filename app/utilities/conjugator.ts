import { Group, Inflection, Verb } from "../types";

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

enum EndingVowel {
  A,
  I,
  E,
  O,
}

/**
 * to get the verb stem we must check if it is an irregular verb
 * if it is reuturn the exception
 * if it is not we must check if it is a godan or ichidan verb
 * if it is a godan verb we must remove the last character and add the correct character
 *
 * @param verb
 * @returns
 */
function getVerbStem(
  verb: string,
  group: Group,
  endingVowel = EndingVowel.I
): string {
  function toA(syllable: string) {
    switch (syllable) {
      case `く`:
        return `か`;
    }
    // return the A verion of a character
  }

  function toI(character: string) {
    switch (character) {
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
    }
  }

  function getGodanVerbStem(verb: string, endingVowel: EndingVowel) {
    const start = verb.slice(0, -1);
    const lastCharacter = verb.slice(-1);

    const transformed = toA(lastCharacter);

    return `${start}${transformed}`;
  }

  // depending on the group we'll have to branch off to figure out the correct
  // ending syllable required
  switch (group) {
    // easiest option is ichidan since we just have to remove the る syllable
    case Group.Ichidan:
      return verb.slice(0, -1);
    case Group.Godan:
      return getGodanVerbStem(verb, endingVowel);
  }

  if (verb === "する") {
    return "し";
  } else if (verb === "来る") {
    return "来";
  }
}

/**
 * returns the 'a' syllable version of a character
 *
 * @param character string
 * @returns
 */
function getVerbA(character: string): string {
  switch (character) {
    case `う`:
      return `わ`;
    case `く`:
      return `か`;
    case `す`:
      return `さ`;
    case `つ`:
      return `た`;
    case `ぬ`:
      return `な`;
    case `ぶ`:
      return `ば`;
    case `む`:
      return `ま`;
    case `る`:
      return `ら`;
    case `ぐ`:
      return `が`;
    default:
      return character;
  }
}

function inflect(
  verb: Verb,
  inflection: Inflection,
  isNegative: boolean
): string {
  switch (inflection) {
    // 食べる
    case "non-past":
      return verb.slug;
    // 食べます
    case "non-past-polite":
      return getVerbStem(verb) + "ます";
    // 食べた
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

function makeNegative(lesson: Lesson) {
  if (lesson.answer === "する") {
    return {
      ...lesson,
      answer: "しない",
    };
  } else if (lesson.answer === "くる") {
    return {
      answer: "こない",
    };
  }

  if (lesson.family === "ichidan") {
    return lesson.slug.slice(0, -1);
  }

  const lastCharacter = lesson.slug.slice(-1);
}

function makePast(lesson: Lesson) {
  if (lesson.answer === "する") {
    return {
      ...lesson,
      answer: "した",
    };
  } else if (lesson.answer === "くる") {
    return {
      ...lesson,
      answer: "きた",
    };
  }

  if (lesson.family === "ichidan") {
    return {
      ...lesson,
      answer: lesson.slug.slice(0, -1) + "た",
    };
  }

  const lastCharacter = lesson.slug.slice(-1);
}

function makeTe(lesson: Lesson) {
  if (lesson.answer === "する") {
    return {
      ...lesson,
      answer: "して",
    };
  } else if (lesson.answer === "くる") {
    return {
      ...lesson,
      answer: "きて",
    };
  }

  if (lesson.family === "ichidan") {
    return {
      ...lesson,
      answer: lesson.slug.slice(0, -1) + "て",
    };
  }

  switch (lesson.slug.slice(-1)) {
    case `う`:
    case "つ":
    case "る":
      return {
        ...lesson,
        answer: `${lesson.slug}って`,
      };
    case `む`:
    case "ぶ":
    case "ぬ":
      return {
        ...lesson,
        answer: `${lesson.slug}んで`,
      };
    case `く`:
    case "ぐ":
      return {
        ...lesson,
        answer: `${lesson.slug}いて`,
      };
    case `す`:
      return {
        ...lesson,
        answer: `${lesson.slug}して`,
      };
  }
}
