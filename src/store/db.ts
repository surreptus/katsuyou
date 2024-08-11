const lessons = [
  {
    slug: "eat",
    date: "2021-08-19T00:00:00.000Z",
  },
  {
    slug: "drink",
    date: "2021-08-19T00:00:00.000Z",
  },
  {
    slug: "sleep",
    date: "2021-08-19T00:00:00.000Z",
  },
];
function createConnection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let db: any;

  const request = indexedDB.open("katsuyou");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request.onerror = (event: any) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request.onsuccess = (event: any) => {
    db = event.target.result;
    console.log(db);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request.onupgradeneeded = (event: any) => {
    db = event.target.result;
    const objectstore = db.createObjectStore("lessons", { keyPath: "slug" });

    objectstore.transaction.oncomplete = () => {
      const lessonStore = db
        .transaction("lessons", "readwrite")
        .objectStore("lessons");

      lessons.forEach((lesson) => {
        lessonStore.add(lesson);
      });
    };
  };

  return db;
}

export const instance = createConnection();
