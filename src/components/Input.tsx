import styled from "@emotion/styled";

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 40px;
  font-size: 1.5rem;
  text-align: center;
  background-color: #f0f0f0;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 0 0 3px transparent;
  width: 100%;
  border: 0;
  :hover,
  :focus,
  :active {
    background-color: white;
    outline: 0;
  }
  :focus {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  :readonly {
    text-decoration: none;
  }
`;
