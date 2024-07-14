import styled from "@emotion/styled";
import { GREEN } from "../theme/colors";

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 40px;
  border: 0;
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  transition: background-color 0.2s;
  background-color: ${GREEN};
  :disabled {
    background-color: rgba(0, 0, 0, 0.5);
  }
  :hover,
  :active {
    cursor: pointer;
    background-color: #317231;
  }
`;
