import verbs from "../../data/verbs.json";

export const SORTED_VERBS = Object.values(verbs).sort((first, second) =>
  first.level < second.level ? 1 : 0
);
