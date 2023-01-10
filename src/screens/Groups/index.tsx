import React, { useState, useCallback } from "react";

import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { GroupCard } from "@componets/GroupCard";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { ListEmpty } from "@componets/ListEmpty";

import { Button } from "@componets/Button";

import { listGroups } from "@storage/group/groupService";
import { Container } from "./styles";

export function Groups() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);

  const renderItem = ({ item }: { item: string }) => {
    return <GroupCard title={item} onPress={() => handleGroup(item)} />;
  };

  const handleGroup = (groupName: string) => {
    navigation.navigate("players", { group: groupName });
  };

  const handleNewGroup = () => {
    navigation.navigate("newGroup");
  };

  const fetchGroups = async () => {
    try {
      const data = await listGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title={"Turmas"} subtile={"Jogue com sua turma"} />
      <FlatList
        data={groups}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message={"Que tal cadastrar a primeira turma?"} />
        )}
      />

      <Button title={"Criar nova turma"} onPress={handleNewGroup} />
    </Container>
  );
}
