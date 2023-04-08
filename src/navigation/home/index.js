import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../../screens/home/map";
import HomeScreens from "../../screens/home";
import { NavigationContainer } from "@react-navigation/native";
import MedicalForm from "../../screens/medicalForm";
import Navigator from "../navigator";
export default function HomeScreen() {
  const Stack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const currentUserObj = useSelector((state) => state.auth);
  console.log;
  const EmptyScreen = () => {
    return (
      <View>
        <Text>
          EMPTYU SCREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
        </Text>
      </View>
    );
  };
  useEffect(() => {
    console.log(JSON.stringify(currentUserObj));
  }, []);
  return (
    <Stack.Navigator>
      {currentUserObj.currentUser.surveyTaken == false ? (
        <Stack.Screen
          name="aquth"
          component={MedicalForm}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="sus"
            component={Navigator}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
