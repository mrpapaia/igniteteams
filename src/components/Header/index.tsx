import React from "react";
import { Container, Logo, BackButton, BackIcon } from "./style";
import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = { showBackButton?: boolean };

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.navigate("groups");
  };
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleBackButton}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
