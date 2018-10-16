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
  saveButton: {
    height: 44,
    paddingBottom: 4,
    justifyContent: "flex-end"
  },
  toolbarTitleContainer: {
    flex: 4,
    justifyContent: "flex-end"
  },
  toolbarButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  toolbarTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center"
  },
  saveText: {
    fontSize: 18,
    color: "#fff"
  }
});
