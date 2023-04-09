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

// export const createUserData =
//   (medical_data, comfortable_responses) => (dispatch) =>
//     new Promise((resolve, reject) => {
//       firebase
//         .firestore()
//         .collection("users")
//         .doc(firebase.auth().currentUser.uid)
//         .update({
//           medical_data: medical_data,
//           comfortable_responses: comfortable_responses,
//         })
//         .then(() => {
//           resolve();
//         })
//         .catch((error) => {
//           console.log("TANUJ FUCKED UP" + error);
//           reject();
//         });
//     });

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

// export const setFirstPageData = (data) => (dispatch) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .update({
//         basicData: data,
//       });
//   });

// export const setSecondPageData = (data) => (dispatch) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .update({
//         ecgData: data,
//       });
//   });

// export const setThirdPageData = (data) => (dispatch) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .update({
//         comfortableResponses: data,
//       });
//   });

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

// export const reportEmergency = async () => {
//   console.log("Reporting an emergency");

//   let location = await Location.getCurrentPositionAsync({});

//   let data = await getEmergencyData();

//   data.age = data.age;
//   data.sex = data.sex;
//   data.emergencyType = data.emergencyType;

//   for (const [key, value] of Object.entries(data)) {
//     if (!value) {
//       data[key] = "unknown";
//     }
//   }

//   data.latitude = location.coords.latitude;
//   data.longitude = location.coords.longitude;
//   data.requiresCalling = true;
//   data.responses = [];

//   let temp_data = translateData(data);
//   console.log("TEMP DATA" + JSON.stringify(temp_data));
//   console.log("COCK" + JSON.stringify(data));

//   //const temp_data = null
//   if (temp_data == null) {
//     firebase
//       .firestore()
//       .collection("emergencies")
//       .doc(firebase.auth().currentUser.uid)
//       .set(data);

//     setTimeout(() => {
//       console.log("Timed out");
//       setEmergencyFormCompleted();
//     }, 5000);
//     return true;
//   }

//   console.log(data.chol);
//   if (data.chol > 250) {
//     data.emergencyType = "CPR/Heart Attach";
//   } else {
//     data.emergencyType = "Unknown";
//   }

//   firebase
//     .firestore()
//     .collection("emergencies")
//     .doc(firebase.auth().currentUser.uid)
//     .set(data);

//   console.log("Set the data, setting form to complete");
//   setTimeout(() => {
//     console.log("Timed out");
//     setEmergencyFormCompleted();
//   }, 5000);

//   return true;
// };

// export const setEmergencyFormCompleted = () => {
//   firebase
//     .firestore()
//     .collection("emergencies")
//     .doc(firebase.auth().currentUser.uid)
//     .update({
//       emergencySurveyTaken: true,
//     });
// };

export const startEmergency = async () => {
  console.log("Creating emergency document");
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
        responses: [],
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

// export const createStudent = async (student_Name, student_Phonenumber) => {
//   console.log(student_Name, student_Phonenumber);

//   let data = await firebase
//     .firestore()
//     .collection("users")
//     .doc(firebase.auth().currentUser.uid)
//     .get()
//     .then((snapshot) => {
//       if (snapshot.data().students) {
//         console.log("Elsewwww");
//         console.log(JSON.stringify(snapshot.data().students) + "ZZZZZZZZZZZZZ");
//         return snapshot.data().students;
//       } else {
//         console.log("Else");
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(firebase.auth().currentUser.uid)
//           .update({
//             students: {
//               studentName: student_Name,
//               studentPhoneNumber: student_Phonenumber,
//             },
//           });
//         dataa.push([{
//           studentName: student_Name,
//           studentPhoneNumber: student_Phonenumber,
//         }]);
//       }
//     });
//   console.log(JSON.stringify(dataa) + "QQQQQQQQQQQ");
//   dataa.push({
//     studentName: student_Name,
//     studentPhoneNumber: student_Phonenumber,
//   });
//   console.log(JSON.stringify(dataa) + "QWWWWWWWWWW");
//   firebase
//     .firestore()
//     .collection("users")
//     .doc(firebase.auth().currentUser.uid)
//     .update({
//       students: dataa,
//     })
//     .then(() => {
//       console.log(firebase.auth().currentUser.uid);
//       resolve();
//     })
//     .catch((error) => {
//       console.log("Error when creating student" + error);
//       reject();
//     });
// };
/*
 firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        students: [
          {
            studentName: student_Name,
            studentPhoneNumber: student_Phonenumber,
          },
        ],
      })
      .then(() => {
        console.log(firebase.auth().currentUser.uid);
        resolve();
      })
      .catch((error) => {
        console.log("Error when creating student" + error);
        reject();
      }); */
