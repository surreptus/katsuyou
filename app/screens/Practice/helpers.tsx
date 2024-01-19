import verbs from "../../data/verbs.json";

export function getNextLesson() {
  return verbs[Math.floor(Math.random() * verbs.length)];
}
