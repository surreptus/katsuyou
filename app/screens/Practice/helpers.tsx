import lessons from "../../data/lessons.json";

export function getNextLesson() {
  return lessons[Math.floor(Math.random() * lessons.length)];
}
