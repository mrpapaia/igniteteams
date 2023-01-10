import React, { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";
import { Button } from "@componets/Button";
import { Header } from "@componets/Header";
import { Highlight } from "@componets/Highlight";
import { Input } from "@componets/Input";
import { useNavigation } from "@react-navigation/native";
import { saveGroup } from "@storage/group/groupService";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState("");

  const handleCreate = async () => {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o norme do grupo");
      }
      await saveGroup(groupName);
      navigation.navigate("players", { group: groupName });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
        return;
      }
      Alert.alert("Novo Grupo", "Não foi possivel criar um novo grupo.");
      console.log(error);
    }
  };

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title={"Nova turma"}
          subtile={"crie uma turma para adicionar pessoas"}
        />
        <Input placeholder={"Nome da turma"} onChangeText={setGroupName} />
      </Content>
      <Button title={"Criar"} onPress={handleCreate} />
    </Container>
  );
}
