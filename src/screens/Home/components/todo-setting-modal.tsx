import { type ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { BaseButton } from "@/components/buttons/base-button";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const TodoSettingModal = ({ isVisible, onClose }: Props): ReactNode => {
  const editItem = () => {
    //
  };
  const deleteItem = () => {
    //
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.settingTitle}>設定</Text>

            <BaseButton style={styles.settingItem} onPress={editItem}>
              編集
            </BaseButton>
            <BaseButton style={styles.settingItem} onPress={deleteItem}>
              削除
            </BaseButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 10,
  },
  settingTitle: {
    fontWeight: "bold",
  },
  settingItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});
