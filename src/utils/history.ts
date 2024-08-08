import { useState } from "react";

export const useHistory = () => {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem("lessons") || "[]")
  );

  const add = (verb: string) => {
    const next = [
      ...history,
      {
        slug: verb,
        date: new Date().toISOString(),
      },
    ];

    localStorage.setItem("lessons", JSON.stringify(next));
    setHistory(next);
  };

  return {
    lessons: history,
    add,
  };
};
