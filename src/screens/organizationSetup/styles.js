import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3d5a80",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
