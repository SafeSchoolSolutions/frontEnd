import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
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
  setEmergencySexDB,
  setEmergencyType,
  setVictimState,
  startEmergency,
} from "../redux/actions/auth";
import * as Clipboard from "expo-clipboard";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { adminFunction } from "../redux/actions/auth";
export default OnboardingItem = ({ item, scrollTo }) => {
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [chol, setChol] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ecgResult, setEcgResult] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [painType, setPainType] = useState(null);

  const [fastingBloodSugar, setFastingBloodSugar] = useState(null);
  const [ecg, setEcg] = useState(null);
  const { width } = useWindowDimensions();

  const [emergencySelected, setEmergencySelected] = React.useState([]);
  const [selected, setSelected] = useState([]);
  var wage = "";

  const [code, setCode] = useState(null);
  const [emergencySex, setEmergencySex] = useState(null);
  const [emergencyChol, setEmergencyChol] = useState(null);
  const [emergencyEcg, setEmergencyEcg] = useState(null);
  const [emregencyState, setEmergencyState] = useState([]);
  const [emergencyFastingBloodSugar, setEmergencyFastingBloodSugar] =
    useState(null);
  const victimState = [
    { key: "1", value: "Concious" },
    { key: "2", value: "Bleeding" },
    { key: "3", value: "Breathing" },
  ];
  const data = [
    { key: "1", value: "Drowing" },
    { key: "2", value: "Car Crash" },
    { key: "3", value: "CPR/Heart Attack" },
    { key: "4", value: "First Aid" },
    { key: "5", value: "Shooting" },
    { key: "6", value: "Collapse" },
  ];
  const sexArray = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Everyday" },
  ];
  const ecgResultArray = [
    { key: "1", value: "Normal" },
    { key: "2", value: "Mild/Moderate Abnormality" },
    { key: "3", value: "Severe" },
  ];
  const painTypeArray = [
    { key: "1", value: "Squeezing" },
    { key: "2", value: "Other Chest Pain" },
    { key: "3", value: "Non Cardiac Chest Pain" },
    { key: "4", value: "No Chest Pain" },
  ];
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
            setAge(text);
          }}
          style={styles.textInput}
          placeholder="Student Count"
          placeholderTextColor={"#98c1d9"}
        />

        <TextInput
          onChangeText={(text) => setChol(text)}
          style={styles.textInput}
          placeholder="Location"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setChol(text)}
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={"#98c1d9"}
        />

        <Text style={styles.YesNoText}>Additional Information:</Text>

        <TextInput
          onChangeText={(text) => setFastingBloodSugar(text)}
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
          onChangeText={(text) => setHeartRate(text)}
          style={styles.textInput}
          placeholder="      "
          placeholderTextColor={"#98c1d9"}
        />
        <TouchableOpacity onPress={() => scrollTo}>
          <Text style={{ color: "#8cc1e8" }}>
            Dont have one? Scroll to the next page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputss}
          onPress={() => {
            fuckYOU();
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
            <Text style={styles.descriptions}>Generate Code:</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", padding: 40 }}>
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
    startEmergency(location);
    return (
      <View style={[styles.container, { width }]}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.title}>Emergency Survey</Text>
          <Text style={styles.description}>
            Please take the time to enter data truthfully.
          </Text>
          <Text style={styles.description}>
            Feel free to leave something empty if you don't know the answer.
          </Text>
        </View>
      </View>
    );
  }
  if (item.type == 6) {
    return (
      <View style={[styles.container, { width }]}>
        <TextInput
          onChangeText={(text) => {
            setEmergencyAge(text);
            console.log("setting age too : " + age);
          }}
          style={styles.textInput}
          placeholder="Age"
          placeholderTextColor={"#98c1d9"}
        />

        <TextInput
          onChangeText={(text) => setEmergencyChol(text)}
          style={styles.textInput}
          placeholder="Cholesterol"
          placeholderTextColor={"#98c1d9"}
        />
        <TextInput
          onChangeText={(text) => setEmergencyFastingBloodSugar(text)}
          style={styles.textInput}
          placeholder="Fasting Blood Sugar"
          placeholderTextColor={"#98c1d9"}
        />
        <Text style={styles.YesNoText}>Do you have chest pain?</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.YesNoButton}
            onPress={() => {
              setEmergencyEcg(true);
              console.log(ecg);
            }}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.YesNoButton}
            onPress={() => {
              setEmergencyEcg(false);
              console.log(ecg);
            }}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
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
      </View>
    );
  }
  if (item.type == 7) {
    return (
      <View style={[styles.container, { width }]}>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flex: 0.8, marginTop: 40 }}>
          <Text style={styles.title}>What happened?</Text>

          <SelectList
            setSelected={(val) => setEmergencySelected(val)}
            data={data}
            save="value"
            maxHeight={100}
            search={false}
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

        <Text style={styles.title}>What state is victim in?</Text>
        <Text style={styles.description}>select all that apply</Text>
        <MultipleSelectList
          setSelected={(val) => setEmergencyState(val)}
          data={victimState}
          save="value"
          label="Categories"
          maxHeight={200}
          search={false}
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
    paddingBottom: 200,
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
    margin: 10,
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
