import React, { useState, type ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { BaseButton } from "@/components/buttons/base-button";
import { useTodo } from "@/context/todo-context";
import { InputModal } from "./input-modal";

type Props = {
  id: string;
  isVisible: boolean;
  onClose: () => void;
};

export const TodoSettingModal = ({
  isVisible,
  onClose,
  id,
}: Props): ReactNode => {
  const { deleteTodo, todos, updateTodo } = useTodo();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const todoItem = todos.find((todo) => todo.id === id);

  const editItem = () => {
    setIsEditModalVisible(true);
    onClose();
  };

  const deleteItem = () => {
    deleteTodo(id);
    onClose();
  };

  const handleEditSubmit = (title: string, date: Date) => {
    if (!todoItem) return;
    updateTodo(id, {
      ...todoItem,
      title,
      date: new Date(date),
      done: todoItem.done,
    });
    setIsEditModalVisible(false);
  };

  return (
    <>
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

      {isEditModalVisible && todoItem && (
        <InputModal
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          initialTitle={todoItem.title}
          initialDate={new Date(todoItem.date)}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
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
