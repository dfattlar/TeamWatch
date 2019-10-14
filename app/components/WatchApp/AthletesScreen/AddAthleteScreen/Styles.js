import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    alignItems: "center"
  },
  formText: {
    fontSize: 16,
    fontWeight: "200",
    margin: 20
  },
  errorTextHidden: {
    marginTop: 5,
    color: "#fff"
  },
  errorText: {
    color: "red"
  },
  modalSaveButton: {
    backgroundColor: "#90aabf",
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#433c3c"
  },
  modalSaveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 6
  }
});
