import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect } from "react";
import Device from "expo-device";
import * as Location from "expo-location";
import {
  createUserData,
  setFormCompleted,
  setAgeDB,
  setCholDB,
  setEcgDB,
  setEcgResultDB,
  setFBSDB,
  setHeartRateDB,
  setPainTypeDB,
  setResponseWilling,
  setSexDB,
  setEmergencyAgeDB,
  setEmergencyCholDB,
  setEmergencyECGDB,
  setEmergencyFBSDB,
  setEmergencyType,
  setVictimState,
  startEmergency,
  setLocationDB,
  setPhoneNumberDB,
  setStudentCountDB,
  setAdressDB,
  setAdditionalInfoDB,
  setEmergencyRaceDB,
  setEmergencyHeightDB,
  setEmergencyWeightDB,
  setEmergencySexDB,
  setEmergencyStudentsListDB,
} from "../redux/actions/auth";
import { checkCode } from "../redux/actions/auth";
import * as Clipboard from "expo-clipboard";
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
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  SlideOutLeft,
} from "react-native-reanimated";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { adminFunction } from "../redux/actions/auth";
export default OnboardingItem = ({ item, scrollTo }) => {
  const [emergencyAge, setEmergencyAge] = useState(null);
  const [emergencySex, setEmergencySex] = useState(null);
  const [emergencyRace, setEmergencyRace] = useState(null);
  const [emergencyHeight, setEmergencyHeight] = useState(null);
  const [emergencyWeight, setEmergencyWeight] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [injuredStudentList, setInjuredStudentList] = useState([]);
  const [painType, setPainType] = useState(null);

  const [fastingBloodSugar, setFastingBloodSugar] = useState(null);
  const [ecg, setEcg] = useState(null);
  const { width } = useWindowDimensions();
  const [emergencyData, setEmergencyData] = useState(null);
  const [emergencySelected, setEmergencySelected] = React.useState([]);
  const [selected, setSelected] = useState([]);
  var wage = "";

  const [code, setCode] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null);
  const [emergencyArray, setEmergencyArray] = useState(null);
  const sexArray = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];
  const susArray = [
    { key: 1, value: "Dhdh Dhdh" },
    { key: 2, value: "Dhdh Dhdh" },
    { key: 3, value: "Dhdh Dhdh" },
  ];
  const [adress, setAdress] = useState(null);
  const [emergencyFastingBloodSugar, setEmergencyFastingBloodSugar] =
    useState(null);
  const getNamesFromFirestore = async () => {
    const names = [];
    console.log("Trying to get data");
    try {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("students")
        .get();
      let i = 1;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name) {
          names.push({ key: i, value: data.name });
          i++;
        }
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
    console.log("HERE IS THE DATA" + JSON.stringify(names));
    return names;
  };

  useEffect(() => {
    const fetchData = async () => {
      const names = await getNamesFromFirestore();
      setEmergencyArray(names);
    };
    fetchData();
  }, [item.id]);

  const codeCheck = async () => {
    console.log("Checking code : " + code);
    const snapShot = await firebase
      .firestore()
      .collection("users")
      .where("code", "==", String(code))
      .get()
      .then(console.log(code + "FUCKKK"));

    if (!snapShot.empty) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          code: String(code),
        });
      setFormCompleted();
    } else {
      Alert.alert("Alert", "Please Enter A Valid Code", [
        {
          text: "Continue",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-12),
            withDelay(800, withTiming(1)),
            withTiming(-12)
          ),
          -1
        ),
      },
    ],
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withDelay(1500, withTiming(0)),
        withDelay(300, withTiming(1))
      ),
      -1
    ),
  }));
  // age sex race height weight
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("emergencies")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(
        (doc) => {
          console.log("Document data:", doc.data());
        },
        (error) => {
          console.log("Error getting document:", error);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (emergencyAge) {
      setEmergencyAgeDB(emergencyAge);
    }
  }, [emergencyAge]);
  useEffect(() => {
    if (injuredStudentList[0]) {
      console.log("In useEffect, injuredStudentList:", injuredStudentList);
      setEmergencyStudentsListDB(injuredStudentList);
    }
  }, [injuredStudentList]);
  useEffect(() => {
    if (emergencySex) {
      setEmergencySexDB(emergencySex);
    }
  }, [emergencySex]);
  useEffect(() => {
    if (emergencyRace) {
      setEmergencyRaceDB(emergencyRace);
    }
  }, [emergencyRace]);
  useEffect(() => {
    if (emergencyWeight) {
      setEmergencyWeightDB(emergencyWeight);
    }
  }, [emergencyWeight]);
  useEffect(() => {
    if (emergencyHeight) {
      setEmergencyHeightDB(emergencyHeight);
    }
  }, [emergencyHeight]);

  useEffect(() => {
    if (extraInfo) {
      setAdditionalInfoDB(extraInfo);
    }
  }, [extraInfo]);
  useEffect(() => {
    if (adress) {
      setAdressDB(adress);
    }
  }, [adress]);
  useEffect(() => {
    if (phoneNumber) {
      setPhoneNumberDB(phoneNumber);
    }
  }, [phoneNumber]);
  useEffect(() => {
    if (studentCount) {
      setStudentCountDB(studentCount);
    }
  }, [studentCount]);
  useEffect(() => {
    if (location) {
      setLocationDB(location);
    }
  }, [location]);
  const fuckYOU = () => {
    const upperBound = 999;
    const lowerBound = 100;
    const number =
      lowerBound + Math.floor(Math.random() * (upperBound - lowerBound + 1));

    console.log(number);

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        admin: true,
        code: number,
      })
      .catch((e) => console.log(e));
    setCode(number);
  };
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (item.type == 1) {
    console.log("yo");
    return (
      <View style={[styles.container, { width }]}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.title}>School/Classroom Setup</Text>
          <Text style={styles.description}>
            This information is given to police and other first responders.
          </Text>
          <Text style={styles.description}>
            if you are an adminstrator, answer for the entire school.
          </Text>
        </View>
      </View>
    );
  }
  if (item.type == 2) {
    return (
      <View style={[styles.container, { width }]}>
        <TextInput
          onChangeText={(text) => {
            setStudentCount(text);
          }}
          style={styles.textInput}
          placeholder="Student Count"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => {
            setAdress(text);
          }}
          style={styles.textInput}
          placeholder="Address/Room #"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setLocation(text)}
          style={styles.textInput}
          placeholder="Location"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={"#98c1d9"}
        />

        <Text style={styles.YesNoText}>Additional Information:</Text>

        <TextInput
          onChangeText={(text) => setExtraInfo(text)}
          style={styles.textInputs}
          placeholder="EX: Between library and hallway. Tight"
          placeholderTextColor={"#98c1d9"}
        />
      </View>
    );
  }
  if (item.type == 3) {
    return (
      <View style={[styles.container, { width }]}>
        <Text style={styles.YesNoText}>Enter Organization Code:</Text>

        <TextInput
          onChangeText={(text) => {
            setCode(text);
            console.log(code);
          }}
          style={styles.textInput}
          placeholder=" "
          placeholderTextColor={"#98c1d9"}
        />
        <TouchableOpacity onPress={() => scrollTo}>
          <Animated.Text
            style={[
              {
                paddingTop: 16,
                color: "#8cc1e8",
                fontWeight: "600",

                letterSpacing: 0.5,
              },
              animatedStyles,
            ]}
          >
            Dont have one? Scroll →
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputss}
          onPress={() => {
            console.log(code);
            codeCheck(code);
          }}
        >
          <Text style={styles.descriptions}>Submit:</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (item.type == 4) {
    return (
      <View style={[styles.container, { width }]}>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flex: 0.8, marginTop: 40 }}>
          <TouchableOpacity
            style={styles.textInputss}
            onPress={() => {
              fuckYOU();
            }}
          >
            <Animated.Text
              style={[
                {
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#98c1d9",
                  textAlign: "center",
                },
                opacityStyle,
              ]}
            >
              Generate Code:
            </Animated.Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              padding: 40,
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(code);
              }}
            >
              <Feather
                name="clipboard"
                size={40}
                color="rgb(237, 229, 204)"
                style={{
                  margin: 20,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.descriptionss}>{code}</Text>
          </View>

          <View style={{ flex: 0.5 }}></View>
        </View>
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: "contain" }]}
        />
      </View>
    );
  }
  if (item.type == 5) {
    // age sex race height weight
    startEmergency(location);
    return (
      <View style={[styles.container, { width }]}>
        <TextInput
          onChangeText={(text) => {
            setEmergencyAge(text);
            console.log("setting age too : " + emergencyAge);
          }}
          style={styles.textInput}
          placeholder="Age"
          placeholderTextColor={"#98c1d9"}
        />

        <TextInput
          onChangeText={(text) => setEmergencyRace(text)}
          style={styles.textInput}
          placeholder="Race"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setEmergencyWeight(text)}
          style={styles.textInput}
          placeholder="Weight(lb's)"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setEmergencyHeight(text)}
          style={styles.textInput}
          placeholder="Height(Estimate)"
          placeholderTextColor={"#98c1d9"}
        />
        <Text style={styles.YesNoText}>Sex</Text>
        <SelectList
          setSelected={(val) => setEmergencySex(val)}
          data={sexArray}
          save="value"
          search={false}
          maxHeight={90}
          boxStyles={{
            backgroundColor: "#98c1d9",
            borderColor: "#e0fbfc",
          }}
          inputStyles={{ color: "#e0fbfc" }}
          dropdownStyles={{
            backgroundColor: "#98c1d9",
            borderColor: "#e0fbfc",
          }}
          dropdownTextStyles={{ color: "#e0fbfc" }}
        />
        <Text style={styles.YesNoText}>Select Injured Students</Text>
        <MultipleSelectList
          setSelected={(val) => setInjuredStudentList(val)}
          data={emergencyArray}
          save="value"
          label="Students:"
          maxHeight={200}
          search={true}
          boxStyles={{
            backgroundColor: "#98c1d9",
            borderColor: "#e0fbfc",
          }}
          inputStyles={{ color: "#e0fbfc" }}
          dropdownStyles={{
            backgroundColor: "#98c1d9",
            borderColor: "#e0fbfc",
          }}
          dropdownTextStyles={{ color: "#e0fbfc" }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d5a80",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#98c1d9",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: "#98c1d9",
    textAlign: "center",
    paddingHorizontal: 64,
  },
  descriptions: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#98c1d9",
    textAlign: "center",
  },
  descriptionss: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "#98c1d9",
    textAlign: "center",
  },
  containers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#e0fbfc",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 40,
    fontSize: 20,
    placeholderTextColor: "#98c1d9",
    color: "#98c1d9",
  },
  textInputs: {
    borderColor: "#e0fbfc",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    paddingBottom: 160,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 40,
    fontSize: 15,
    placeholderTextColor: "#98c1d9",
    color: "#98c1d9",
  },
  textInputss: {
    borderColor: "#e0fbfc",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",

    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 40,
    fontSize: 30,
    placeholderTextColor: "#98c1d9",
    color: "#98c1d9",
  },
  YesNoText: {
    marginTop: 15,
    paddingHorizontal: 40,
    fontSize: 20,
    color: "#98c1d9",
    margin: 4,
  },
  YesNoButton: {
    borderWidth: 1,
    borderColor: "#e0fbfc",
    borderRadius: 30,
    backgroundColor: "#98c1d9",
    margin: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#e0fbfc",
  },
});
