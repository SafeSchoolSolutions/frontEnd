import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { getEmergencies } from "../../../redux/actions";
export default function MapScreen() {
  const [markerArrayS, setMarkerArrayS] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let markerArray = [];
      await firebase
        .firestore()
        .collection("emergencies")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            markerArray.push({
              title: doc.data().emergencyType,
              coordinates: {
                latitude: doc.data().latitude,
                longitude: doc.data().longitude,
              },
            });
          });
        })
        .catch((e) => console.log(e));

      setMarkerArrayS(markerArray);
    }
    const response = fetchData();
  }, []);

  markerArrayS.forEach((element) => {
    console.log(element.coordinates);
    console.log(element.title);
  });
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
  };
  return (
    <MapView showsUserLocation={true} style={{ height: "100%", width: "100%" }}>
      {markerArrayS.map((element) => (
        <Marker coordinate={element.coordinates} title={element.title} />
      ))}
      <Marker coordinate={tokyoRegion} />
    </MapView>
  );
}
