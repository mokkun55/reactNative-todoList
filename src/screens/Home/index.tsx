import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { type TodoType } from "@/types/todo-type";
import { AddButton } from "./components/add-button";
import { InputModal } from "./components/input-modal";
import { TodoItem } from "./components/todo-item";

export const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // TODO 仮置き
  const todos: TodoType[] = [
    {
      id: "1",
      title: "買い物",
      done: false,
    },
    {
      id: "2",
      title: "掃除",
      done: true,
    },
    {
      id: "3",
      title: "洗濯",
      done: false,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      {/* todo一覧 */}
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TodoItem todoItem={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* 入力欄モーダル*/}
      {isModalVisible && (
        <InputModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}

      {/* 追加ボタン */}
      <AddButton onPress={() => setIsModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  todoContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
