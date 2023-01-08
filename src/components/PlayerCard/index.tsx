import { ButtonIcon } from "@componets/ButtonIcon";
import React from "react";
import { Container, Icon, Name } from "./styles";

type Props = {
  name: string;
  onRemove: () => void;
};
export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon />
      <Name>{name}</Name>
      <ButtonIcon icon={"close"} type={"SECONDARY"} onPress={onRemove} />
    </Container>
  );
}
