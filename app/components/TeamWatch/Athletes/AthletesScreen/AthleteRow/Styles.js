import { StyleSheet } from "react-native";

export default StyleSheet.create({
  athleteRow: {
    height: 60,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    backgroundColor: "#fff"
  },
  athleteAddButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: "#d3d3d3",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  onWatch: {
    height: 30,
    width: 30,
    borderRadius: 50,
    margin: 4,
    backgroundColor: "#51EC91"
  },
  notOnWatch: {
    backgroundColor: "white"
  },
  addTouchArea: {
    width: 80,
    padding: 10
  },
  athleteRowNameText: {
    fontSize: 24,
    color: "black",
    fontWeight: "200"
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 10
  },
  nameContainer: {
    flex: 1,
    height: 60,
    justifyContent: "center"
  },
  nameTouchContainer: {
    flex: 7,
    justifyContent: "center"
  }
});
