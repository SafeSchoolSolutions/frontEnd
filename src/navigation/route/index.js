import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";
import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import AuthScreen from "../../screens/auth";
import HomeScreens from "../../screens/home";
import MapScreen from "../../screens/home/map";
import EmergencyScreenForm from "../../screens/home/emergency/emergencyForm";
import EmergencyScreen from "../../screens/home/emergency";
import Chat from "../../screens/home/emergency/emergencyChat";
import PickerScreen from "../../screens/organzaitonPage";
const Stack = createStackNavigator();

export default function MainNavigator() {
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser == null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {currentUserObj.currentUser.surveyTaken == false ||
            currentUserObj.currentUser.surveyTaken == null ? (
              <Stack.Screen
                name="aquth"
                component={PickerScreen}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="homeScreen"
                  component={HomeScreens}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="mapScreen"
                  component={MapScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="emergencyScreen"
                  component={EmergencyScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="emergencyScreenForm"
                  component={EmergencyScreenForm}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chatScreen"
                  component={Chat}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
