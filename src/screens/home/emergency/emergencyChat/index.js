import React, { useRef, useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


export default function Chat() {
  const [responses, setResponses] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const stateRef = useRef();
  stateRef.responses = responses;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("emergencies")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        const response_list = snapshot.data()["responses"];

        console.log("Chat Responses", response_list);

        for (let i = 0; i < response_list.length; i++) {
          response_list[i] = {
            _id: i + 1,
            text: response_list[i],
            createdAt: new Date(),
            user: {
              _id: (i % 2) + 1,
              name: "User",
              avatar:
                "https://media.istockphoto.com/id/964719526/vector/red-dispatcher-icon-stock-vector.jpg?s=612x612&w=0&k=20&c=UHJy-OdI7zJmqkhJiUFuaiNbvNkkfw1TdWNBDnxtMeE=",
            },
          };
        }

        setMessages(response_list.reverse());

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      disableComposer={true}
      minInputToolbarHeight={0}
      renderInputToolbar={() => null}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
