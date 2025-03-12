import { useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const InputModal = ({ isVisible, onClose }: Props): ReactNode => {
  const [text, onChangeText] = useState<string>("");

  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="例: トマトを買う"
          autoFocus
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ccc",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 0,
  },
});
