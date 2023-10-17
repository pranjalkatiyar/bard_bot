import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [selectedChatFaceData, setselectedChatFaceData] = useState(
    ChatFaceData[0]
  );
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[{ color: selectedChatFaceData.primary }, styles.greeting]}>
        Hello
      </Text>
      <Text
        style={[
          { fontWeight: "bold", color: selectedChatFaceData.primary },
          styles.greeting,
        ]}
      >
        I am {selectedChatFaceData.name}
      </Text>
      <Image
        source={{ uri: selectedChatFaceData.image }}
        width={200}
        height={200}
        style={styles.selectedIcon}
      />
      <Text style={styles.questionText}>How can I help you?</Text>
      <View style={styles.iconsContainer}>
        <FlatList
          data={ChatFaceData}
          renderItem={({ item }) =>
            selectedChatFaceData.id !== item.id && (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setselectedChatFaceData(item)}
              >
                <Image source={{ uri: item.image }} width={45} height={45} />
              </TouchableOpacity>
            )
          }
          horizontal
        />
        <Text style={styles.iconText}>Choose your favourite buddy</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selectedChatFaceData.primary },
        ]}
        onPress={() =>
          navigation.navigate("chat", { selectedFace: selectedChatFaceData })
        }
      >
        <Text style={styles.buttonText}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    alignItems: "center",
    flexDirection: "column",
  },
  greeting: {
    fontSize: 45,
    flexDirection: "column",
  },
  selectedIcon: {
    marginTop: 30,
  },
  questionText: {
    marginTop: 30,
    fontSize: 35,
    fontWeight: "bold",
  },
  iconsContainer: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    height: 100,
    borderRadius: 10,
    marginVertical: 30,
  },
  icon: {
    margin: 15,
  },
  iconText: {
    marginVertical: 10,
    fontSize: 17,
    color: "#a9a9a9",
  },
  button: {
    backgroundColor: "#000",
    padding: 20,
    width: Dimensions.get("screen").width * 0.6,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
