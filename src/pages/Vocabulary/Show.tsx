import { Container, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import verbs from "../../data/verbs.json";

type Index = keyof typeof verbs;

export const Show = () => {
  const { slug } = useParams();
  const verb = verbs[slug as Index];

  return (
    <Container>
      <Heading>{slug}</Heading>

      <Text>{verb.reading}</Text>
    </Container>
  );
};
