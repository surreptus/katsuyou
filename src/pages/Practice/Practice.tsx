import {
  Badge,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Input,
  Progress,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Mic } from "react-feather";

const INITIAL_VALUES = {
  guess: "",
};

interface FormValues {
  guess: string;
}

export function Practice() {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      height="100vh"
      size="md"
      justifyContent="center"
    >
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form>
          <VStack>
            <Heading>食べる</Heading>

            <Badge colorScheme="green">Verb</Badge>

            <Progress value={10} />

            <HStack>
              <Field lang="ja" as={Input} name="guess" placeholder="hello" />

              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                icon={<Mic />}
              />
            </HStack>

            <Button mt="8" colorScheme="green" type="submit">
              Submit
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Container>
  );
}
