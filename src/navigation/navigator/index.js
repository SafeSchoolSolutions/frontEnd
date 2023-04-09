import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../../screens/auth";
import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../home";
import HomeScreens from "../../screens/home";
import MapScreen from "../../screens/home/map";
export default function Navigator() {
  const Stack = createStackNavigator();
  console.log("aioipsodjpa");
  const EmptyScreen = () => {
    console.log("wwww SCREEN");
    return <View></View>;
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreens}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="mapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
