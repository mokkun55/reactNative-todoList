import { useEffect, useState, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import dayjs from "dayjs";

import { type TodoType } from "@/types/todo-type";

type Props = {
  todoItem: TodoType;
};

export const TodoItem = ({ todoItem }: Props): ReactNode => {
  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);
  const formattedDate = dayjs(todoItem.date).format("M/DD");

  useEffect(() => {
    const today = dayjs().format("M/DD");
    const tomorrow = dayjs().add(1, "day").format("M/DD");

    if (formattedDate === today) {
      setIsToday(true);
      setIsTomorrow(false);
    } else if (formattedDate === tomorrow) {
      setIsTomorrow(true);
      setIsToday(false);
    } else {
      setIsToday(false);
      setIsTomorrow(false);
    }
  }, [formattedDate]);

  return (
    <>
      <BouncyCheckbox
        size={24}
        text={todoItem.title}
        textStyle={styles.item}
        isChecked={todoItem.done}
      />
      <View style={styles.footerItems}>
        <View style={styles.dates}>
          <Text
            style={[
              styles.day,
              isToday && { color: "#FFA500" },
              isTomorrow && { color: "#499C20" },
            ]}
          >
            {isToday ? "今日" : isTomorrow ? "明日" : formattedDate}
          </Text>
          <Text style={styles.time}>{isToday && todoItem.time}</Text>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  tag: {
    color: "#333",
  },
});
