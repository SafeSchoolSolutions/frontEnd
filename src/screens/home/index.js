import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { goToSettings, startEmergency } from "../../redux/actions";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import MapScreen from "./map";
export default function HomeScreens() {
  const navigation = useNavigation();
  console.log("I wanna die");
  return (
    <View style={{ flex: 1, backgroundColor: "#3d5a80" }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 100,
          marginHorizontal: 20,
          paddingTop: 30,
          justifyContent: "center",
          flex: 0.21,
        }}
      >
        <View style={{}}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              goToSettings();
            }}
          >
            <Icon.Settings color={"#e0fbfc"} width={50} height={50} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 125 }}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("mapScreen");
          }}
        >
          <View style={{}}>
            <Icon.MapPin color={"#e0fbfc"} width={50} height={50} />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{ flex: 0.5, alignContent: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={async () => {
            console.log("STARTING EMERGENCY BOYS!!!!");
            await startEmergency();
            navigation.navigate("emergencyScreenForm");
          }}
        >
          {[...Array(10).keys()].map((index) => {
            return (
              <MotiView
                from={{ opacity: 0.7, scale: 1 }}
                animate={{ opacity: 0, scale: 4 }}
                transition={{
                  type: "timing",
                  duration: 4000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  repeatReverse: false,
                  loop: true,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.dot]}
              />
            );
          })}
          <Text style={styles.emergencyText}>Emergency</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3d5a80",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#3d5a80",
    textAlign: "center",
    justifyContent: "center",
  },
  emergencyButton: {
    alignSelf: "center",
    height: 150,
    width: 150,
    borderRadius: 100,
    borderColor: "#3d5a80",
    borderWidth: 2,
    backgroundColor: "#FF0000",
    justifyContent: "center",
  },
  dot: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: "#ee6c4d",
  },
  YesNoText: {
    marginTop: 15,
    paddingHorizontal: 40,
    fontSize: 20,
    color: "#98c1d9",
    margin: 10,
  },
  YesNoButton: {
    borderWidth: 1,
    borderColor: "#e0fbfc",
    borderRadius: 30,
    backgroundColor: "#98c1d9",
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
  },
});
