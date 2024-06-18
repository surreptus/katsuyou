import { Text, Box, Container, Heading, Input, VStack } from "@chakra-ui/react";
import verbs from "../../data/verbs.json";
import { useState } from "react";

console.log(verbs);

export const Vocabulary = () => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? verbs.filter((verb) => verb.slug.includes(search))
    : verbs;

  return (
    <Container size="sm">
      <Heading>Vocabulary</Heading>

      <Input
        type="text"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />

      <VStack alignItems="flex-start">
        {filtered.map((verb) => (
          <Box key={verb.slug}>
            <Heading size="md">{verb.slug}</Heading>
            <Text>{verb.japanese[0].reading}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};
