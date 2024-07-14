import styled from "@emotion/styled";
import { GREEN } from "../theme/colors";

interface Props {
  value: number;
}

const Rail = styled.div`
  background-color: #ccc;
  border-radius: 40px;
  height: 0.5rem;
  width: 100%;
`;

const Bar = styled.div`
  background-color: ${GREEN};
  border-radius: 40px;
  height: 100%;
  width: ${(props: Props) => props.value}%;
`;

export const Progress = ({ value }: Props) => (
  <Rail>
    <Bar value={value} />
  </Rail>
);
