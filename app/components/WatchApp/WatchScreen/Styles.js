import { StyleSheet } from "react-native";

export default StyleSheet.create({
  timerSection: {
    flex: 4
  },
  backgroundImg: {
    overflow: "hidden",
    backgroundColor: "#d3d3d3",
    flex: 1,
    width: null,
    height: null
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flex: 3,
    marginTop: -10
  },
  relayContainer: {
    backgroundColor: "lightgray"
  },
  relayText: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontWeight: "300",
    paddingTop: 5,
    paddingBottom: 5
  },
  relayFinishTime: {
    fontSize: 20,
    marginTop: 20
  },
  appContainer: {
    flex: 1
  },
  athleteListContainer: {
    flex: 5,
    backgroundColor: "white",
    bottom: 45
  },
  button: {
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "200"
  },
  startButton: {
    borderColor: "#51EC91"
  },
  stopButton: {
    borderColor: "#433C3C"
  }
});
