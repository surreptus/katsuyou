import { Inflection } from "@surreptus/japanese-conjugator";

export interface Verb {
  level: number;
  slug: string;
  group: string;
  reading: string;
  jlpt: string;
  kana: boolean;
  definitions: string[];
}

export enum Level {
  Beginner = "BEGINNER",
  Intermediate = "INTERMEDIATE",
  Advanced = "ADVANCED",
  Expert = "EXPERT",
}

export interface Review {
  slug: string;
  dueDate: Date;
  level: Level;
  prompt: Inflection;
}
