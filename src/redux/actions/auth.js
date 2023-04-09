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
  console.log("HII");
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

//const exampleMedData = {
//   "age": 15,
//   "sex": 1,
//   "chol": 216,
//    "fbs": 1,
//   "hadECG": false,
// }
//
// const comfortable_responses = ['cpr', 'drowning', 'first-aid']
export const createUserData =
  (medical_data, comfortable_responses) => (dispatch) =>
    new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          medical_data: medical_data,
          comfortable_responses: comfortable_responses,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log("TANUJ FUCKED UP" + error);
          reject();
        });
    });

export const setFormCompleted = () => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      surveyTaken: true,
    });
};

export const getFormCompleted = () => {
  console.log(firebase.auth().currentUser.uid);
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
export const setPainTypeDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      painType: data,
    });
};
export const setHeartRateDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      maxHeartRate: data,
    });
};
export const setEcgResultDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      ECGResult: data,
    });
};
export const setEcgDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      Chestpain: data,
    });
};
export const setFBSDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      fastingBloodSugar: data,
    });
};
export const setLocationDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      location: data,
    });
};
export const setPhoneNumberDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      phoneNumber: data,
    });
};
export const setStudentCountDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      student_Count: data,
    });
};
export const setAdressDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      address: data,
    });
};
export const setAdditionalInfoDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      extraInfo: data,
    });
};
export const setSexDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      sex: data,
    });
};
export const setAgeDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      age: data,
    });
};
export const goToSettings = () => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      surveyTaken: false,
    });
};

export const setFirstPageData = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        basicData: data,
      });
  });

export const setSecondPageData = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        ecgData: data,
      });
  });

export const setThirdPageData = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        comfortableResponses: data,
      });
  });

export const setResponseWilling = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      willingToRespond: data,
    });
};

const checkForHeartDisease = async (data) => {
  const url = `https://92c6-76-21-126-166.ngrok.io/predict?age=${data.age}&sex=${data.sex}&cp=${data.painType}&chol=${data.chol}&fbs=${data.fastingBloodSugar}&restecg=${data.ECGResult}&thalach=${data.maxHeartRate}&exang=${data.Chestpain}`;
  console.log("URLLL" + url);
  await fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson["result"];
    });
};

const translateData = (data) => {
  if (data.ECGResult == "Mild/Moderate Abnormality") {
    data.ECGResult = 2;
  } else if (data.ECGResult == "Severe") {
    data.ECGResult = 0;
  } else if (data.ECGResult == "Normal") {
    data.ECGResult = 1;
  } else {
    throw new Error(
      "ECG Result not formatted correctly, should be Mild/Moderate Abnormality, Severe, or Normal"
    );
  }

  if (data.painType == "Squeezing") {
    data.painType = 3;
  } else if (data.painType == "Other Chest Pain") {
    data.painType = 1;
  } else if (data.painType == "Non Cardiac Chest Pain") {
    data.painType = 2;
  } else if (data.painType == "No Chest Pain") {
    data.painType = 0;
  } else {
    throw new Error(
      "Chest pain not formatted correctly, should be Squeezing, Other chest Pain, non cardiac chest pain, or no chest pain"
    );
  }

  if (data.sex == "Male") {
    data.sex = 1;
  } else if (data.sex == "Female") {
    data.sex = 1;
  } else {
    throw new Error("Sex formatted incorrectly");
  }

  if (data.Chestpain == true) {
    data.Chestpain = 1;
  } else if (data.Chestpain == false) {
    data.Chestpain = 0;
  } else {
    throw new Error("Chest pain not formatted");
  }
  if (parseInt(data.fastingBloodSugar) > 120) {
    data.fastingBloodSugar = 1;
  } else if (parseInt(data.fastingBloodSugar) < 120) {
    data.fastingBloodSugar = 0;
  } else {
    throw new Error("fastingBloodSugar formatted incorrectly");
  }

  return data;
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

export const reportEmergency = async () => {
  console.log("Reporting an emergency");

  let location = await Location.getCurrentPositionAsync({});

  let data = await getEmergencyData();

  data.age = data.age;
  data.sex = data.sex;
  data.emergencyType = data.emergencyType;

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      data[key] = "unknown";
    }
  }

  data.latitude = location.coords.latitude;
  data.longitude = location.coords.longitude;
  data.requiresCalling = true;
  data.responses = [];

  let temp_data = translateData(data);
  console.log("TEMP DATA" + JSON.stringify(temp_data));
  console.log("COCK" + JSON.stringify(data));

  //const temp_data = null
  if (temp_data == null) {
    firebase
      .firestore()
      .collection("emergencies")
      .doc(firebase.auth().currentUser.uid)
      .set(data);

    setTimeout(() => {
      console.log("Timed out");
      setEmergencyFormCompleted();
    }, 5000);
    return true;
  }

  console.log(data.chol);
  if (data.chol > 250) {
    data.emergencyType = "CPR/Heart Attach";
  } else {
    data.emergencyType = "Unknown";
  }

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .set(data);

  console.log("Set the data, setting form to complete");
  setTimeout(() => {
    console.log("Timed out");
    setEmergencyFormCompleted();
  }, 5000);

  return true;
};

export const setEmergencyFormCompleted = () => {
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      emergencySurveyTaken: true,
    });
};
export const selfReport = async () => {
  console.log("WE IN THE MAINF RAME");
  let data = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  console.log(JSON.stringify(data) + " WE IN SELF REPORT WITH DATA");
  const temp_data = translateData(data);
  const result = await checkForHeartDisease(temp_data);
  if (result > 0.5) {
    data.emergencyType = "CPR/Heart Attach";
  } else {
    data.emergencyType = "unknown";
  }

  let location = await Location.getCurrentPositionAsync({});

  data.latitude = location.coords.latitude;
  data.longitude = location.coords.longitude;
  data.responses = [];
  console.log(JSON.stringify(data));

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .set(data);
};
export const startEmergency = async () => {
  console.log("SStarting emergency");
  let location = await Location.getCurrentPositionAsync({});
  const data = await getCurrentUserData();
  console.log("mainframe", data);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((res) => {
      if (res.exists) {
        const code = res.data().code;
        console.log("YESSS", code);
        firebase
          .firestore()
          .collection("emergencies")
          .doc(firebase.auth().currentUser.uid)
          .set({
            code: code,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            requiresCalling: true,
            responses: [],
          })
          .catch((e) => console.log(e));
      }
    });
};

export const adminFunction = () => {
  console.log("HIIOII");

  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      admin: true,
    })
    .catch((e) => console.log(e));
};

export const setEmergencyAgeDB = (data) => {
  console.log("SETTING NEW AGE FOR EMERGENCY");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      age: data,
    })
    .catch((e) => console.log(e));
};
export const setEmergencyRaceDB = (data) => {
  console.log("SETTING NEW race FOR EMERGENCY");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      race: data,
    })
    .catch((e) => console.log(e));
};
export const setEmergencyHeightDB = (data) => {
  console.log("SETTING NEW height FOR EMERGENCY");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      height: data,
    })
    .catch((e) => console.log(e));
};
export const setEmergencyWeightDB = (data) => {
  console.log("SETTING NEW weight FOR EMERGENCY");

  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      weight: data,
    })
    .catch((e) => console.log(e));
};
export const setEmergencyCholDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      chol: data,
    });
};
export const setEmergencyFBSDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      fastingBloodSugar: data,
    });
};

export const setEmergencyECGDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      chestPain: data,
    });
};

export const setEmergencySexDB = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      sex: data,
    });
};
export const setEmergencyType = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      emergencyType: data,
    });
};
export const setVictimState = (data) => {
  console.log(firebase.auth().currentUser.uid);
  firebase
    .firestore()
    .collection("emergencies")
    .doc(firebase.auth().currentUser.uid)
    .update({
      victimState: data,
    });
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
        console.log(JSON.stringify(markerArray) + "QQQQQQQQ");
      });
      return markerArray;
    })
    .catch((e) => console.log(e));
  console.log("RETURNING MARKER ARRAY     " + JSON.stringify(markerArray));
  return markerArray;
};
