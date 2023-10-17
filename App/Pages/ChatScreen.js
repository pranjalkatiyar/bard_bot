import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import generateResponse from "../Services/BardService";

const ChatScreen = () => {
  const { selectedFace } = useRoute().params;
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Hello! this is ${selectedFace.name}, How can I help you?`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: selectedFace.name,
        avatar: selectedFace.image,
      },
    },
  ]);
  const [loading, setLoading] = useState(false);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages[0].text.trim() === "") return;
    setLoading(true);
    const botsResponse = await generateResponse(messages[0].text);
    const newMessage = {
      _id: messages[0]._id + 1,
      text: botsResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: selectedFace.name,
        avatar: selectedFace.image,
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        messagesContainerStyle={{ backgroundColor: "#fff" }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: selectedFace.primary,
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ChatScreen;
