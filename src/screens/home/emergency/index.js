import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Animated, {
  AnimatedLayout,
  SlideInUp,
  SlideInRight,
  FadeInRight,
  FadeIn,
  BounceIn,
  LightSpeedInRight,
} from "react-native-reanimated";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";

import Modal from "react-native-modal";
import { selfReport } from "../../../redux/actions";
export default function EmergencyScreen() {
  //USELESS NOW
  const navigation = useNavigation();
  const doesJitHaveHeartDisease = async () => {
    await selfReport();
    navigation.navigate("chatScreen");
  };
  console.log("wasd");
  navigation.navigate("emergencyScreenForm");
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      style={{ flex: 1, backgroundColor: "#ee6c4d" }}
    >
     
      <View style={{ flex: 0.2 }}></View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <Animated.View entering={LightSpeedInRight}>
          <TouchableOpacity
            style={styles.reportButtons}
            onPress={() => {
              doesJitHaveHeartDisease();
            }}
          >
            <Text style={styles.buttonText}>Self Report</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={LightSpeedInRight}>
          <TouchableOpacity
            style={styles.reportButtons}
            onPress={() => {
              navigation.navigate("emergencyScreenForm");
            }}
          >
            <Text style={styles.buttonText} entering={LightSpeedInRight}>
              Report Emergency
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={{ flex: 0.2 }}></View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  reportButtons: {
    backgroundColor: "#3d5a80",
    borderColor: "#293241",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e0fbfc",
  },
});
