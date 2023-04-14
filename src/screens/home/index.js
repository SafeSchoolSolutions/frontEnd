import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Animated, {
  SlideInDown,
  SlidenInUp,
  SlideInLeft,
  SlideInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  SlideOutUp,
  SlideOutDown,
  Transition,
  SlideOutRight,
  SlideOutLeft,
} from "react-native-reanimated";

import { goToSettings, startEmergency } from "../../redux/actions";
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStudent } from "../../redux/actions";
import * as Icon from "react-native-feather";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import MapScreen from "./map";
import Modal from "react-native-modal";
import styles from "./styles";


export default function HomeScreens() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={{ flex: 1, backgroundColor: "#3d5a80" }}>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
          }}
        >
          <Text style={styles.header}>Name</Text>
          <View style={{ opacity: 1 }}>
            <TextInput
              placeholderTextColor={"white"}
              placeholder={"Ex: John Smith"}
              style={styles.inputContainer}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <Text style={styles.header}>Phone Number</Text>
          <View style={{ opacity: 1 }}>
            <TextInput
              placeholderTextColor={"white"}
              placeholder={"Ex: +14084311024"}
              style={styles.inputContainer}
              onChangeText={(value) => setPhoneNumber(value)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                createStudent(name, phoneNumber);
                handleModal;
              }}
            >
              <Text style={styles.circleText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleModal}>
              <Text style={styles.circleText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        <Animated.View
          delay={500}
          entering={SlideInLeft.duration(1500)}
          exiting={SlideOutRight.duration(1500)}
        >
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              goToSettings();
            }}
          >
            <Icon.Settings color={"#e0fbfc"} width={50} height={50} />
          </TouchableOpacity>
        </Animated.View>
        <View style={{ paddingHorizontal: 125 }}></View>
        <TouchableOpacity 
          style={{marginTop: 20}}
          onPress={() => {
            navigation.navigate("Emergency Map");
          }}
        >
          <Animated.View
            delay={500}
            entering={SlideInRight.duration(1500)}
            exiting={SlideOutLeft.duration(1500)}
            style={{}}
          >
            <Icon.MapPin color={"#e0fbfc"} width={50} height={50} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View
        style={{ flex: 0.7, alignContent: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={async () => {
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
      <Animated.View
        delay={500}
        entering={SlideInLeft.duration(1500)}
        exiting={SlideOutRight.duration(1500)}
        style={{}}
      >
        <TouchableOpacity
          onPress={setIsModalVisible}
          style={{ justifyContent: "flex-end", marginTop: 50 }}
        >
          <Icon.Plus color={"#e0fbfc"} width={50} height={50} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
