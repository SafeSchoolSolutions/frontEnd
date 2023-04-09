import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonsContainers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgb(17, 51, 46)",
    paddingVertical: 40,
    borderRadius: 10,
  },

  buttonContainer: {
    borderColor: "rgb(237, 229, 204)",
    borderWidth: 1,
    borderRadius: 20,
    margin: 30,
    marginTop: 20,
    padding: 10,

    backgroundOpacity: 0.1,
    backgroundColor: "rgb(17, 51, 46)",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  headerText: {
    marginTop: height / 6,
    marginBottom: height / 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(17, 51, 46)",
    borderRadius: 10,
    borderColor: "rgb(237, 229, 204)",
    borderWidth: 2,
  },
});

export default styles;
