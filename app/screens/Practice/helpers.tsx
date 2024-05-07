import { useEffect, useState } from "react";
import verbs from "../../data/verbs.json";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Difficulty,
  Group,
  Inflection,
  Lesson,
  Level,
  Verb,
} from "../../types";

/**
 * lessons are a unit of conjugation practice. they include a the base verb, the inflection,
 * level of familiarity, and due date.
 *
 * @returns
 */
export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(null);
  const { getItem, setItem } = useAsyncStorage("@lessons");

  // when we boot up the practice page, attempt to parse out the lessons from storage
  // if we have an overdue lesson set it to the current one, otherwise get the next lesson
  // from the verbs
  useEffect(() => {
    async function fetchLessons() {
      const data = await getItem();

      const parsed = data ? JSON.parse(data) : [];

      setLessons(parsed);
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
    lessons.find((lesson) => new Date(lesson.dueAt) <= new Date());

  /**
   * create a new lesson from a verb we're not currently learning
   *
   * @returns
   */
  const createNextLesson = () => {
    const verb = verbs.find(
      (verb) => !lessons.find((lesson) => lesson.slug === verb.slug)
    );
    return toLesson({
      slug: verb.slug,
      group: Group.Ichidan,
    });
  };

  /**
   * progresses the given lesson with the stated difficulty
   * @returns
   */
  const progressLesson = async (difficulty: Difficulty, lesson: Lesson) => {
    const updated = lessons;

    await setItem(JSON.stringify(updated));
    setCurrentLesson(findNextOverdueLesson(lessons) ?? createNextLesson());
  };

  return { currentLesson, progressLesson };
}

const toLesson = (verb: Verb): Lesson => ({
  level: Level.Unworked,
  slug: verb.slug,
  inflection: Inflection.PastPolite,
  dueAt: new Date().toISOString(),
});
