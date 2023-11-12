import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View, Text } from "react-native";
import Login from "./src/Login";
import List from "./src/List";
import Add from "./src/Add";
const Stack = createStackNavigator();
const StackNavigation = () => {
  const options = {
    headerTitle: "",
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "center" }}>
          <Image style={{ height: 40, width: 40, resizeMode: "contain" }} source={require("./img/user-circle.png")} />
        </View>
        <View>
          <Text style={{ color: "black", fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>Hi</Text>
          <Text style={{ fontSize: 14, marginRight: 10 }}>Have agrate day a head</Text>
        </View>
      </View>
    ),
  };
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={options}>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
