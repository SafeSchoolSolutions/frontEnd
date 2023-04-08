import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Route from "./src/navigation/route";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import "react-native-gesture-handler";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as Notifications from "expo-notifications";
export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBTg32Iv-oRy_jD3vL7QnCIWS5Zl0IlO9k",
    authDomain: "zeroresponder-52ca2.firebaseapp.com",
    databaseURL: "https://zeroresponder-52ca2-default-rtdb.firebaseio.com",
    projectId: "zeroresponder-52ca2",
    storageBucket: "zeroresponder-52ca2.appspot.com",
    messagingSenderId: "733152214492",
    appId: "1:733152214492:web:c9628fcbf8d605c3caa319",
  };
  const store = createStore(rootReducer, applyMiddleware(thunk));
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
