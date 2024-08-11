import styled from "@emotion/styled";

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 40px;
  border: 0;
  :disabled,
  :disabled:hover {
    pointer: not-allowed;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
