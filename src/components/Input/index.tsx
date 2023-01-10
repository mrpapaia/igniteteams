import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};
export function Input({ inputRef, ...rest }: Props) {
  return <Container {...rest} ref={inputRef} />;
}
