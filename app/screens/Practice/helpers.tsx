import { useEffect, useState } from "react";
import verbs from "../../data/verbs.json";
import lessons from "../../data/lessons.json";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Difficulty,
  Group,
  Inflection,
  Lesson,
  Level,
  Verb,
} from "../../types";
import { inflect } from "../../utilities/conjugator";

/**
 * lessons are a unit of conjugation practice. they include a the base verb, the inflection,
 * level of familiarity, and due date.
 *
 * @returns
 */
export function useLessons() {
  const [learning, setLearning] = useState<Lesson[]>([]);
  const [current, setCurrent] = useState<number>(null);
  const { getItem, setItem } = useAsyncStorage("@reviews");

  // when we boot up the practice page, attempt to parse out the lessons from storage
  // if we have an overdue lesson set it to the current one, otherwise get the next lesson
  // from the verbs
  useEffect(() => {
    async function fetchLessons() {
      const data = await getItem();

      const parsed = data ? JSON.parse(data) : [];

      setLearning(parsed);
      console.log(createNextLesson());

      setCurrentLesson(createNextLesson());
    }

    fetchLessons();
  }, []);

  /**
   * returns the next overdue lesson
   *
   * @param lessons
   * @returns
   */
  const findNextOverdueLesson = (lessons: Lesson[]) =>
    lessons.findIndex((lesson) => new Date(lesson.dueAt) <= new Date());

  /**
   * create a new lesson from a verb we're not currently learning
   *
   * @returns
   */
  const createNextLesson = () => {
    const key = lessons.find(
      (lesson) => !learning.find((learning) => learning.slug === lesson)
    );

    const verb = verbs[key] as Verb;

    return toLesson(verb);
  };

  /**
   * progresses the given lesson with the stated difficulty
   * @returns
   */
  const progressLesson = async (difficulty: Difficulty, lesson: Lesson) => {
    const updated = lessons;

    await setItem(JSON.stringify(updated));
    setCurrentLesson(findNextOverdueLesson(learning) ?? createNextLesson());
  };

  return { currentLesson: lessons[current], progressLesson };
}

const toLesson = (verb: Verb): Lesson => ({
  level: Level.Unworked,
  slug: verb.slug,
  inflection: Inflection.PastPolite,
  dueAt: new Date().toISOString(),
});
