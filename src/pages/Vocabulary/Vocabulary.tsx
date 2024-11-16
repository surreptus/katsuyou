import verbs from "../../data/verbs.json";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
const list = Object.values(verbs);

export const Vocabulary = () => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? list.filter((verb) => verb.slug.includes(search))
    : list;

  return (
    <Layout>
      <div>
        <h1>Vocabulary</h1>
        <p>Words that you can practice conjugations for</p>

        <input
          type="text"
          placeholder="Filter"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          value={search}
        />
      </div>

      <div>
        {filtered.map((verb, index) => (
          <Link key={verb.slug + index} to={`/vocabulary/${verb.slug}`}>
            <div key={verb.slug}>
              <h1>{verb.slug}</h1>
              <p>{verb.reading}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
