import verbs from "../../data/verbs.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
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

        <Input
          type="text"
          placeholder="Filter"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </div>

      <div>
        {filtered.map((verb) => (
          <Link to={`/vocabulary/${verb.slug}`}>
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
