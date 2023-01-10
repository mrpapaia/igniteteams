import React, { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ButtonIcon } from "@componets/ButtonIcon";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { Input } from "@componets/Input";
import { Filter } from "@componets/Filter";
import { PlayerCard } from "@componets/PlayerCard";
import { ListEmpty } from "@componets/ListEmpty";
import { Button } from "@componets/Button";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import {
  findByTeam,
  removePlayer,
  savePlayer,
} from "@storage/player/playerService";
import { AppError } from "@utils/AppError";
import { PlayerDTO } from "@storage/player/PlayerDTO";
import { removeGroup } from "@storage/group/groupService";

type RouteParams = {
  group: string;
};
export function Players() {
  const route = useRoute();
  const navigation = useNavigation();
  const [filtesList, setFilterList] = useState<string[]>(["time a", "time b"]);

  const [team, setTeam] = useState<string>("time a");

  const [newPlayer, setNewPlayer] = useState("");

  const [players, setPlayers] = useState<PlayerDTO[]>([]);

  const newPlayerInputRef = useRef<TextInput>(null);

  const { group } = route.params as RouteParams;

  const handleTeam = (value: string) => {
    setTeam(value);
  };

  const handleAddPlayer = async () => {
    if (newPlayer.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    try {
      await savePlayer({ name: newPlayer, team: team }, group);
      newPlayerInputRef.current?.blur();
      setNewPlayer("");
      fetchPlayerByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova pessoa", error.message);
      }
      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possivel adicionar");
    }
  };

  const fetchPlayerByTeam = async () => {
    try {
      const players = await findByTeam(group, team);
      setPlayers(players);
    } catch (error) {}
  };

  const handleRemovePlayer = async (name: string) => {
    try {
      await removePlayer(name, group);
      fetchPlayerByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remove pessoa", "Não foi possivel remover a pessoa.");
    }
  };

  const handleYesRemove = async () => {
    try {
      await removeGroup(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remove pessoa", "Não foi possivel remover o grupo.");
    }
  };

  const handleRemoveGroup = () => {
    Alert.alert("Remover", "Deseja remover o grupo", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: handleYesRemove },
    ]);
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

  const renderPlayerCards = ({ item }: { item: PlayerDTO }) => {
    return (
      <PlayerCard
        name={item.name}
        onRemove={() => handleRemovePlayer(item.name)}
      />
    );
  };

  useEffect(() => {
    fetchPlayerByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtile="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerInputRef}
          placeholder="Nome da pessoa"
          value={newPlayer}
          autoCorrect={false}
          onChangeText={setNewPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType={"done"}
        />
        <ButtonIcon icon={"add"} onPress={handleAddPlayer} />
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
      <Button
        type={"SECONDARY"}
        title={"Remover turma"}
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
