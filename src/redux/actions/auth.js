import { USER_STATE_CHANGE } from "../constants";
import { useDispatch } from "react-redux";
import { Platform, Text, View, StyleSheet } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Device from "expo-device";
import * as Location from "expo-location";


export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("WWW");
    if (user) {
      dispatch(getCurrentUserDataDispatch());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserDataDispatch = () => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((res) => {
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.data(),
          loaded: true,
        });
      }
    });
};

export const getCurrentUserDoc = () => {
  return firebase
  .firestore()
  .collection("users")
  .doc(firebase.auth().currentUser.uid)
};

export const getCurrentUserData = async () => {
  return (await getCurrentUserDoc().get()).data()
};

export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(firebase.auth().currentUser);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

export const setFormCompleted = () => {
  getCurrentUserDoc()
    .update({
      surveyTaken: true,
    });
};

export const getFormCompleted = () => {
  return getCurrentUserDoc()
    .get()
    .then((snap) => {
      return snap.data().surveyTaken;
    })
};

export const setLocationDB = (data) => {
  getCurrentUserDoc()
    .update({
      location: data,
    });
};

export const setPhoneNumberDB = (data) => {
  getCurrentUserDoc()
    .update({
      phoneNumber: data,
    });
};

export const setStudentCountDB = (data) => {
  getCurrentUserDoc()
    .update({
      student_Count: data,
    });
};

export const setAddressDB = (data) => {
  getCurrentUserDoc()
    .update({
      address: data,
    });
};

export const setAdditionalInfoDB = (data) => {
  getCurrentUserDoc()
    .update({
      extraInfo: data,
    });
};

export const setSexDB = (data) => {
  getCurrentUserDoc()
    .update({
      sex: data,
    });
};

export const setAgeDB = (data) => {
  getCurrentUserDoc()
    .update({
      age: data,
    });
};

export const goToSettings = () => {
  getCurrentUserDoc()
    .update({
      surveyTaken: false,
    });
};

export const adminFunction = () => {
  getCurrentUserDoc()
    .update({
      admin: true,
    })
};


export const getEmergencyDoc = () => {
  return firebase 
  .firestore()
  .collection("emergencies")
  .doc(firebase.auth().currentUser.uid)
};

export const setEmergencyAgeDB = (data) => {
  getEmergencyDoc()
    .update({
      age: data,
    })
};

export const setEmergencyStudentsListDB = (data) => {
  getEmergencyDoc()
    .update({
      injuredStudents: data,
    })
};

export const setEmergencyRaceDB = (data) => {
  getEmergencyDoc()
    .update({
      race: data,
    })
};

export const setEmergencyHeightDB = (data) => {
  getEmergencyDoc()
    .update({
      height: data,
    })
};

export const setEmergencyWeightDB = (data) => {
  getEmergencyDoc()
    .update({
      weight: data,
    })
};

export const setEmergencySexDB = (data) => {
  getEmergencyDoc()
    .update({
      sex: data,
    })
};

export const getEmergencyData = async () => {
  return (await getEmergencyDoc().get()).data()
};


export const getCurrentLocation = async () => {
  if (Platform.OS !== "web") {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "Sorry, we need location permissions to make this work!",
        [{ text: "Okay" }]
      );
      return;
    }
  }
  return await Location.getCurrentPositionAsync({});
};


export const startEmergency = async () => {
  console.log("Creating emergency document");
  const current_user_data = await getCurrentUserData()
  const location = await getCurrentLocation()

  const emergencyDoc = await firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .set({
      injuredStudents: [],
      location: current_user_data.location,
      address: current_user_data.address,
      code: current_user_data.code,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      responses: [],
    })
    .catch((e) => console.log("Error when creating emergency doc", e));
};


export const getEmergencies = () => {
  let markerArray = [];
  firebase
    .firestore()
    .collection("emergencies")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        markerArray.push(doc.data());
      });
      return markerArray;
    })
    .catch((e) => console.log(e));
  console.log("RETURNING MARKER ARRAY" + JSON.stringify(markerArray));
  return markerArray;
};

export const createStudent = async (studentName, studentNumber) => {
  console.log(studentName, studentNumber);

  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("students")
    .add({
      name: studentName,
      number: studentNumber,
    });
};

