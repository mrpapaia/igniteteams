import React from "react";
import { Container, Content, Icon } from "./styles";
import { Button } from "@componets/Button";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { Input } from "@componets/Input";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title={"Nova turma"}
          subtile={"crie uma turma para adicionar pessoas"}
        />
        <Input placeholder={"Nome da turma"} />
      </Content>
      <Button title={"Criar"} />
    </Container>
  );
}
