import { StyleSheet } from "react-native";

export default StyleSheet.create({
  toolbar: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 15
  },
  toolbarTitleContainer: {
    flex: 4,
    justifyContent: "flex-end"
  },
  toolbarTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center"
  }
});
