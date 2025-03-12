import { useEffect, useState, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import dayjs from "dayjs";

import { type TodoType } from "@/types/todo-type";
import { useAsyncStorage } from "../hooks/use-async-storage";

type Props = {
  todoItem: TodoType;
};

export const TodoItem = ({ todoItem }: Props): ReactNode => {
  const [isToday, setIsToday] = useState<boolean>(false);
  const [isTomorrow, setIsTomorrow] = useState<boolean>(false);
  const [isBefore, setIsBefore] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(todoItem.done);
  const { toggleTodo } = useAsyncStorage();

  const todoDate = dayjs(todoItem.date);

  useEffect(() => {
    const today = dayjs();
    const tomorrow = dayjs().add(1, "day");

    if (todoDate.isSame(today, "day")) {
      setIsToday(true);
    } else if (todoDate.isSame(tomorrow, "day")) {
      setIsTomorrow(true);
    } else if (todoDate.isBefore(tomorrow, "day")) {
      setIsBefore(true);
    }
  }, [todoDate]);

  return (
    <>
      <BouncyCheckbox
        size={24}
        text={todoItem.title}
        textStyle={styles.item}
        isChecked={isChecked}
        onPress={(isChecked) => {
          setIsChecked(isChecked);
          void toggleTodo(todoItem.id);
        }}
      />
      <View style={styles.footerItems}>
        <View style={styles.dates}>
          <Text
            style={[
              styles.day,
              isToday && { color: "#FFA500" }, // 今日 → オレンジ
              isTomorrow && { color: "#499C20" }, // 明日 → 緑
              isBefore && { color: "#DD4B3F" }, // それ以降 → 赤
            ]}
          >
            {isToday ? "今日" : isTomorrow ? "明日" : todoDate.format("M/DD")}
          </Text>
          <Text style={styles.time}>
            {(isToday || isTomorrow) && todoDate.format("HH:mm")}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    color: "#000",
  },
  footerItems: {
    flexDirection: "row",
    marginLeft: 40,
  },
  dates: {
    flexDirection: "row",
    gap: 8,
  },
  time: {
    color: "#333",
  },
  day: {
    color: "#333",
  },
});
