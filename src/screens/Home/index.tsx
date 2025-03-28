import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useTodo } from "@/context/todo-context";
import { AddButton } from "./components/add-button";
import { InputModal } from "./components/input-modal";
import { TodoItem } from "./components/todo-item";

export const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { todos } = useTodo();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      {/* todo一覧 */}
      {todos.length === 0 && (
        <Text
          style={{
            fontSize: 16,
            color: "#555",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          まだタスクがありません。{"\n"}
          いますぐタスクを追加しましょう!!
        </Text>
      )}
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
    marginTop: 24,
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
