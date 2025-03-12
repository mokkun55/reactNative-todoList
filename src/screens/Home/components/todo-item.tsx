import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { type TodoType } from "@/types/todo-type";

type Props = {
  todoItem: TodoType;
};
export const TodoItem = ({ todoItem }: Props): ReactNode => {
  return (
    <>
      <BouncyCheckbox size={24} text={todoItem.title} textStyle={styles.item} />
      <View style={styles.footerItems}>
        <Text style={styles.time}>XX:XX</Text>
        <Text style={styles.tag}>#タグ</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    color: "#000",
  },
  footerItems: {
    flexDirection: "row", // これでエラーが解消されます
    justifyContent: "space-between",
    marginLeft: 40,
  },
  time: {
    color: "#499C20",
  },
  tag: {
    color: "#333",
  },
});
