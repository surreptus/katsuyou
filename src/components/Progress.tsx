import styled from "@emotion/styled";
import { GREEN } from "../theme/colors";

interface Props {
  value: number;
}

const Rail = styled.div`
  background-color: rgba(0, 16, 32, 0.08);
  border-radius: 1rem;
  height: 1rem;
  width: 100%;
  overflow: hidden;
`;

const Bar = styled.div`
  background-color: ${GREEN};
  border-radius: 1rem;
  min-width: 1rem;
  height: 100%;
  width: ${(props: Props) => props.value}%;
`;

export const Progress = ({ value }: Props) => (
  <Rail role="progressbar" aria-valuenow={value}>
    <Bar value={value} />
  </Rail>
);
