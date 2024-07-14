import styled from "@emotion/styled";

interface Props {
  isValid?: boolean;
}

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: ${(props: Props) =>
    props.isValid ? "3px solid green" : "3px solid red"};
`;
