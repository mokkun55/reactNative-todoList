import { useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useTodo } from "@/context/todo-context";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const InputModal = ({ isVisible, onClose }: Props): ReactNode => {
  const [text, onChangeText] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const { todos, addTodo } = useTodo();

  // 年月日変更時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate ?? date;
    setDate(currentDate);
  };

  // 時分変更時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate ?? date;
    setDate(currentDate);
  };

  const onSubmit = async () => {
    if (!text) return;

    // setTodos([
    //   ...todos,
    //   { id: String(todos.length + 1), title: text, date, done: false },
    // ]);

    try {
      void addTodo({
        id: String(todos.length + 1),
        title: text,
        date,
        done: false,
      });
      await AsyncStorage.getItem("todos");
    } catch (e) {
      console.error("追加エラー:", e);
    }

    onChangeText("");
    onClose();
  };

  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="例: トマトを買う"
          placeholderTextColor="#555"
          autoFocus
          onSubmitEditing={onSubmit}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.datePickerContainer}>
            {/* MEMO androidは別で書かないといけないらしい https://note.com/npaka/n/n093a9a657962 */}
            <DateTimePicker
              value={date}
              mode="date"
              themeVariant="light"
              display="default"
              onChange={onDateChange}
              locale="ja-JP"
              style={{ marginLeft: -20 }}
            />
            <DateTimePicker
              value={date}
              minuteInterval={10}
              mode="time"
              themeVariant="light"
              is24Hour={true}
              display="default"
              onChange={onTimeChange}
              locale="ja-JP"
            />
          </View>
          <Icon
            name="arrowup"
            size={24}
            color="#fff"
            style={{
              padding: 10,
              backgroundColor: "#DD4B3F",
              borderRadius: 50,
            }}
            onPress={onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ccc",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  input: {
    fontSize: 18,
    height: 40,
    margin: 12,
    padding: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  datePickerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});
