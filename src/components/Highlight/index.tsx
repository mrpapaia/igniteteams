import Reat from "react";
import { Container, Title, SubTitle } from "./styles";

type Props = {
  title: string;
  subtile: string;
};

export function Highlight({ title, subtile }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtile}</SubTitle>
    </Container>
  );
}
