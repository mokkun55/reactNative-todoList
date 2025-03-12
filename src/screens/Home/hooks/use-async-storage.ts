import AsyncStorage from "@react-native-async-storage/async-storage";

import { type TodoType } from "@/types/todo-type";

export const useAsyncStorage = () => {
  // 保存されているTODOリストを取得
  const getTodos = async (): Promise<TodoType[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      if (!jsonValue) return [];
      return JSON.parse(jsonValue) as TodoType[];
    } catch (e) {
      console.error("取得エラー", e);
      return [];
    }
  };

  // リストを保存
  const saveTodos = async (todos: TodoType[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (e) {
      console.error("セーブエラー", e);
      return;
    }
  };

  // リストに追加
  const addTodo = async (todo: TodoType): Promise<void> => {
    try {
      // 保存されているTODOリストを取得
      const jsonValue = await AsyncStorage.getItem("todos");
      if (!jsonValue) {
        // 保存されているデータがない場合は新規作成
        await saveTodos([todo]);
        return;
      }
      const todos = JSON.parse(jsonValue) as TodoType[];

      // 新しいTODOを追加
      const newTodos = [...todos, todo];

      // リストを保存
      await saveTodos(newTodos);
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  // 要素を削除
  const deleteTodo = async (id: string): Promise<void> => {
    try {
      // 保存されているTODOリストを取得
      const jsonValue = await AsyncStorage.getItem("todos");
      if (!jsonValue) return;
      const todos = JSON.parse(jsonValue) as TodoType[];

      // 削除するTODOを検索
      const newTodos = todos.filter((todo) => todo.id !== id);

      // リストを保存
      await saveTodos(newTodos);
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  return {
    getTodos,
    saveTodos,
    addTodo,
    deleteTodo,
  };
};
