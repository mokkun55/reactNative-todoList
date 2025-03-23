import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { TodoType } from "@/types/todo-type";

type TodoContextType = {
  todos: Array<TodoType>;
  setTodos: (todos: Array<TodoType>) => void;
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, todo: TodoType) => void;
  deleteTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  // 保存されているTODOリストを取得
  const fetchTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      if (!jsonValue) return [];
      setTodos(JSON.parse(jsonValue) as TodoType[]);
    } catch (e) {
      console.error("取得エラー", e);
    }
  };

  // 初回読み込み
  useEffect(() => {
    void fetchTodos();
  }, []);

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

  // 新しいTODOを追加
  const addTodo = async (todo: TodoType): Promise<void> => {
    try {
      const newTodos = [...todos, todo];

      // リストを保存
      await saveTodos(newTodos);
      setTodos([...todos, todo]);
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  // トグルTODO
  const toggleTodo = async (id: string) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    void saveTodos(newTodos);
    setTodos(newTodos);
  };

  // TODOを更新
  const updateTodo = async (id: string, todo: TodoType) => {
    try {
      const newTodos = todos.map((t) => {
        if (t.id === id) {
          return todo;
        }
        return t;
      });
      await saveTodos(newTodos);
      setTodos(newTodos);
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((t) => t.id !== id);
    void saveTodos(newTodos);
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo: (todo) => {
          void addTodo(todo);
        },
        toggleTodo: (id) => {
          void toggleTodo(id);
        },
        updateTodo: (id, todo) => {
          void updateTodo(id, todo);
        },
        deleteTodo,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoはTodoProvider内でのみ使用可能です");
  }
  return context;
};
