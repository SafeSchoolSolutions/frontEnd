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
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAu5IvjFeaDoWyQftk4mkxgFNznHJUujrQ",
    authDomain: "protected-50243.firebaseapp.com",
    databaseURL: "https://protected-50243-default-rtdb.firebaseio.com",
    projectId: "protected-50243",
    storageBucket: "protected-50243.appspot.com",
    messagingSenderId: "239271562379",
    appId: "1:239271562379:web:08fe96a8377ee702d4188e",
    measurementId: "G-R9D15TV9MV"
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
