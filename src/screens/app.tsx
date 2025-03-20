import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import dayjs from "dayjs";

import "dayjs/locale/ja";

import { TodoProvider } from "@/context/todo-context";
import { HomeScreen } from "@/screens/Home";

dayjs.locale("ja");
const Stack = createStackNavigator();

const App = () => {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Todo List">
          <Stack.Screen name="Todo List" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
};

// eslint-disable-next-line no-unused-expressions
registerRootComponent(App);
