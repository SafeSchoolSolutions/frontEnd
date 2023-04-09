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
      dispatch(getCurrentUserData());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => (dispatch) => {
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

export const checkCode = (code) => (dispatch) => {
  console.log("Checking if org code is valid");
  firebase
    .firestore()
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((querySnap) => {
      if (!querySnap.empty) {
        let result = querySnap.map((doc) => {
          return doc.data();
        });
      }
    });
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
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      surveyTaken: true,
    });
};

export const getFormCompleted = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()

    .then((snapshot) => {
      console.log(JSON.stringify(snapshot.data().surveyTaken));
      resolve(snapshot.data().surveyTaken);
    })
    .catch((e) => console.log(e));
};

export const setLocationDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      location: data,
    });
};

export const setPhoneNumberDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      phoneNumber: data,
    });
};

export const setStudentCountDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      student_Count: data,
    });
};

export const setAdressDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      address: data,
    });
};

export const setAdditionalInfoDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      extraInfo: data,
    });
};

export const setSexDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      sex: data,
    });
};

export const setAgeDB = (data) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      age: data,
    });
};

export const goToSettings = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      surveyTaken: false,
    });
};


export const getEmergencyData = async () => {
  return await firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      console.log(snapshot.id);
      console.log(snapshot.data());
      return snapshot.data();
    });
};


export const startEmergency = async () => {
  console.log("Creating emergency document");
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
  let location = await Location.getCurrentPositionAsync({});
  const code = (
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
  ).data().code;

  const emergencyDoc = await firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .get();
  if (emergencyDoc.exists) {
    emergencyDoc.ref
      .update({
        code: code,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      .catch((e) => console.log("Error when creating emergency doc", e));
  } else
    emergencyDoc.ref
      .set({
        code: code,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        responses: [],
      })
      .catch((e) => console.log("Error when creating emergency doc", e));
};

export const adminFunction = () => {
  console.log("Setting current user as an admin");
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      admin: true,
    })
    .catch((e) => console.log("Error when setting admin", e));
};

export const setEmergencyAgeDB = (data) => {
  console.log("Setting age of shooter");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      age: data,
    })
    .catch((e) => console.log("Error when setting age", e));
};

export const setEmergencyStudentsListDB = (data) => {
  console.log("setEmergencyStudentsListDB, data:", data);

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      injuredStudents: data,
    })
    .then(() => {
      console.log("Update successful, data:", data);
    })
    .catch((e) => console.log("Error when setting age", e));
};
export const setEmergencyRaceDB = (data) => {
  console.log("Setting race of shooter");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      race: data,
    })
    .catch((e) => console.log("Error when setting race", e));
};
export const setEmergencyHeightDB = (data) => {
  console.log("Setting height of shooter");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      height: data,
    })
    .catch((e) => console.log("Error when setting height", e));
};
export const setEmergencyWeightDB = (data) => {
  console.log("Setting weight of shooter");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      weight: data,
    })
    .catch((e) => console.log("Error when setting weight", e));
};

export const setEmergencySexDB = (data) => {
  console.log("Setting sex of shooter");
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      sex: data,
    })
    .catch((e) => console.log("Error when setting sex", e));
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

