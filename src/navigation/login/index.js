import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../../screens/auth";
import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Navigator from "../navigator";
import HomeScreen from "../home";
export default function MainNavigator() {
  const Stack = createStackNavigator();
  const currentUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
    console.log(JSON.stringify(currentUserObj));
  }, []);

  if (!currentUserObj.loaded) {
    return (
      <View>
        <Text>LOAD YOU </Text>
      </View>
    );
  }
  const SussyScreen = () => {
    console.log("SUSS SCREEN");
    return (
      <View>
        <Text>
          THIS IS ONT
          wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        </Text>
      </View>
    );
  };
  const EmptyScreen = () => {
    console.log("wwww SCREEN");
    return <View></View>;
  };

  return null;
}
