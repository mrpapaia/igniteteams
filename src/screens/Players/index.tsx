import React, { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { ButtonIcon } from "@componets/ButtonIcon";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { Input } from "@componets/Input";
import { Filter } from "@componets/Filter";
import { PlayerCard } from "@componets/PlayerCard";
import { ListEmpty } from "@componets/ListEmpty";
import { Button } from "@componets/Button";

export function Players() {
  const [filtesList, setFilterList] = useState<string[]>(["time a", "time b"]);

  const [team, setTeam] = useState<string>("time a");

  const [players, setPlayers] = useState([]);

  const handleTeam = (value: string) => {
    setTeam(value);
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Filter
        isActive={item === team}
        title={item}
        onPress={() => handleTeam(item)}
      />
    );
  };

  const renderPlayerCards = ({ item }: { item: string }) => {
    return <PlayerCard name={item} onRemove={() => {}} />;
  };
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtile="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon={"add"}></ButtonIcon>
      </Form>
      <HeaderList>
        <FlatList
          horizontal
          data={filtesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPlayerCards}
        ListEmptyComponent={() => (
          <ListEmpty message={"Não há pessoas nesse time."} />
        )}
      />
      <Button type={"SECONDARY"} title={"Remover turma"} />
    </Container>
  );
}
