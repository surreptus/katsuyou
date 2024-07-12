import { useParams } from "react-router-dom";
import verbs from "../../data/verbs.json";

type Index = keyof typeof verbs;

export const Show = () => {
  const { slug } = useParams();
  const verb = verbs[slug as Index];

  return (
    <div>
      <h1>{slug}</h1>

      <p>{verb.reading}</p>
    </div>
  );
};
