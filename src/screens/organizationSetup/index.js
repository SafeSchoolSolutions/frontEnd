import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import styles from "./styles";
import Svg, { Ellipse, ClipPath } from "react-native-svg";
import React, { useState, useRef, useEffect } from "react";
import Paginator from "../../components/Paginator";
import NextButton from "../../components/NextButton";
import OnboardingItem from "../../components/OnboardingItem";
import { setFormCompleted } from "../../redux/actions";
import { Feather } from "@expo/vector-icons";
import * as Device from "expo-device";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../redux/actions/auth";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { getFormCompleted } from "../../redux/actions/auth";
import Modal from "react-native-modal";
import {
  setParentOrChild,
  getUsersExpoToken,
  updateUsersExpoToken,
} from "../../redux/actions/auth";


export default function PickerScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const [FormComplete, setFormComplete] = useState(false);
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setFormCompleted();
    }
  };

  const data = [
    {
      id: "1",
      type: "1",
    },
    {
      id: "2",
      type: "2",
    },
    {
      id: "3",
      type: "3",
    },
    {
      id: "4",
      type: "4",
    },
  ];

  useEffect(() => {
    handleReload();
  }, [currentIndex]);


  const [userId, setUserid] = useState("");
  const bg_image =
    "https://w0.peakpx.com/wallpaper/13/361/HD-wallpaper-watercolor-bright-colors-paint-splash-texture.jpg";

  const handleReload = () => {
    const currentForm = getFormCompleted();
    setFormComplete(currentForm);
    console.log("Form completed", FormComplete);
  };


  return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <OnboardingItem item={item} scrollTo={scrollTo} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              keyExtractor={(item) => item.id}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>

          <Paginator data={slides} scrollX={scrollX} />
          <NextButton
            scrollTo={scrollTo}
            percentage={(currentIndex + 1) * (100 / slides.length)}
          />
        </View>
    </View>
  );
}
