import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import StackNavigator from "./Navigator/StackNavigator";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import "react-native-gesture-handler";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <StackNavigator />
        <StatusBar style="auto" />
      </Provider>
    </NativeBaseProvider>
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
