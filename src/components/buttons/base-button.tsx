import { type ReactNode } from "react";
import { Pressable, Text, type StyleProp, type TextStyle } from "react-native";

type Props = {
  onPress: () => void;
  children: ReactNode;
  style: StyleProp<TextStyle>;
};

export const BaseButton = ({ onPress, children, style }: Props) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text>{children}</Text>
    </Pressable>
  );
};
