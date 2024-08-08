export interface Verb {
  level: number;
  slug: string;
  group: string;
  reading: string;
  jlpt: string;
  kana: boolean;
  definitions: string[];
}

export interface Lesson {
  slug: string;
  date: string;
}
