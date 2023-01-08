import React, { useState } from "react";

import { FlatList } from "react-native";
import { GroupCard } from "@componets/GroupCard";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { ListEmpty } from "@componets/ListEmpty";

import { Container, Title } from "./styles";
import { Button } from "@componets/Button";

interface Group {
  id: string;
  name: string;
}
export function Groups() {
  const [groups, setGroups] = useState<Group[]>([
    { id: "0", name: "Ignite" },
    { id: "1", name: "Smite" },
  ]);

  const renderItem = ({ item }: { item: Group }) => {
    return <GroupCard title={item.name} />;
  };

  return (
    <Container>
      <Header />
      <Highlight title={"Turmas"} subtile={"Jogue com sua turma"} />
      <FlatList
        data={groups}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message={"Que tal cadastrar a primeira turma?"} />
        )}
      />

      <Button title={"Criar nova turma"} />
    </Container>
  );
}
