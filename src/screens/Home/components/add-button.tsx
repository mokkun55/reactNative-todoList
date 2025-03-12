import { type ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

type Props = {
  onPress: () => void;
};

export const AddButton = ({ onPress }: Props): ReactNode => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name="plus" size={24} color="#fff" style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  icon: {
    backgroundColor: "#DD4B3F",
    padding: 20,
    borderRadius: 50,
  },
});
