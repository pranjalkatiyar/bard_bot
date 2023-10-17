import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigation from "./App/Navigation/HomeScreenNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <HomeScreenNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
