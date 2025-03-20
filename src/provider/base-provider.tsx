import type { ReactNode } from "react";

import { TodoProvider } from "@/context/todo-context";

export const BaseProvider = ({ children }: { children: ReactNode }) => {
  return <TodoProvider>{children}</TodoProvider>;
};
// TODO あとでやる
