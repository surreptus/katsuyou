import styled from "@emotion/styled";

interface Props {
  isValid?: boolean;
}

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 40px;
  font-size: 2rem;
  text-align: center;
  background-color: rgba(48, 24, 24, 0.1);
  transition: background-color 0.2s;
  width: 100%;
  border: 0;
  :hover,
  :active {
    background-color: rgba(48, 24, 24, 0.2);
  }
  :focus {
    outline: 0;
  }
`;
