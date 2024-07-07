import {
  Text,
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Link,
} from "@chakra-ui/react";
import verbs from "../../data/verbs.json";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
const list = Object.values(verbs);

export const Vocabulary = () => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? list.filter((verb) => verb.slug.includes(search))
    : list;

  return (
    <Container size="sm">
      <Box top="0" backgroundColor="#fff" p="2" position="sticky">
        <Heading fontSize="lg">Vocabulary</Heading>
        <Text mb="2" fontSize="sm">
          Words that you can practice conjugations for
        </Text>

        <Input
          type="text"
          placeholder="Filter"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </Box>

      <VStack alignItems="stretch">
        {filtered.map((verb) => (
          <Link
            as={RouterLink}
            to={`/vocabulary/${verb.slug}`}
            _hover={{
              backgroundColor: "gray.100",
            }}
          >
            <Box key={verb.slug} px="4" py="2">
              <Heading size="md">{verb.slug}</Heading>
              <Text>{verb.reading}</Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Container>
  );
};
