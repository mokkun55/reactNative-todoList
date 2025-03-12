import { type ReactNode } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  isVisible: boolean;
};

export const TodoSettingModal = ({ isVisible }: Props): ReactNode => {
  return (
    <View style={styles.container}>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <Text>Setting</Text>
        <Text>Setting</Text>
        <Text>Setting</Text>
        <Text>Setting</Text>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f0",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 500,
    left: 500,
    width: 500,
    height: 500,
  },
});
