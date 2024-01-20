export enum Group {
  Ichidan = "ichidan",
  Godan = "godan",
  Irregular = "irregular",
}

export enum Level {
  Beginner,
  Intermediate,
  Advanced,
  Master,
  Burned,
}

export enum Inflection {
  NonPast = "non-past",
  NonPastPolite = "non-past-polite",
  Past = "past",
  PastPolite = "past-polite",
  Te = "te",
  Potential = "potential",
  Passive = "passive",
  Causative = "causative",
  CausativePassive = "causative-passive",
  Imperative = "imperative",
}

export interface Lesson {
  slug: string;
  inflection: Inflection;
  level: Level;
  dueAt: string;
  isNegative: boolean;
}

export interface Verb {
  slug: string;
  group: Group;
  senses: any[];
}
