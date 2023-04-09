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
import slides from "./slides";
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
import {
  setParentOrChild,
  getUsersExpoToken,
  updateUsersExpoToken,
} from "../../redux/actions/auth";
export default function PickerScreen() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#3d5a80",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  ///ww

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
  const hasParent = true;
  const handleReload = () => {
    const currentForm = getFormCompleted();
    setFormComplete(currentForm);
    console.log(FormComplete + " QQQQQQQQQQQQ");
  };
  return (
    <View style={{ flex: 1 }}>
      {!hasParent && (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgb(17, 51, 46)",
              flex: 0.8,
              borderRadius: 40,
            }}
          >
            <View style={styles.headerText}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "500",
                  color: "rgb(237, 229, 204)",
                }}
              >
                Share this code with your parents to get started!
              </Text>
            </View>
            <View style={styles.idContainer}>
              <Animated.View
                entering={SlideInDown}
                exiting={SlideOutDown}
                style={styles.singleContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setStringAsync(userId);
                  }}
                >
                  <Feather
                    name="clipboard"
                    size={30}
                    color="rgb(237, 229, 204)"
                    style={{
                      margin: 9,
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                entering={SlideInDown}
                exiting={SlideOutDown}
                style={styles.singleContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleReload();
                  }}
                >
                  <Feather
                    name="refresh-cw"
                    size={30}
                    color="rgb(237, 229, 204)"
                    style={{ margin: 9 }}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={SlideInDown}
                exiting={SlideOutDown}
                style={styles.singleContainer}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "rgb(237, 229, 204)",
                    fontSize: 30,
                    fontWeight: "500",
                    marginTop: 9,
                    height: 40,
                  }}
                >
                  {userId.substring(0, 12)}...
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>
      )}

      {hasParent && (
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
      )}
    </View>
  );
}
