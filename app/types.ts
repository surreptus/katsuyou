export enum Group {
  Ichidan = "ichidan",
  Godan = "godan",
  Irregular = "irregular",
}

export interface Verb {
  slug: string;
  group: Group;
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

export enum Level {
  Unworked,
  Beginner,
  Intermediate,
  Advanced,
  Master,
  Burned,
}

export interface Lesson {
  slug: string;
  inflection: Inflection;
  level: Level;
  dueAt: string;
}

export enum Difficulty {
  Easy,
  Hard,
}
