import styled from "@emotion/styled";

interface Props {
  direction?: "row" | "column";
}

export const Stack = styled.div`
  display: flex;
  flex-direction: ${(props: Props) => props.direction || "row"};
  align-items: center;
  gap: 1rem;
`;
