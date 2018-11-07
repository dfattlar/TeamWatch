import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    marginBottom: 50
  },
  noEventContainer: {
    alignItems: "center"
  },
  noEventTitle: {
    fontSize: 24,
    fontWeight: "200",
    marginTop: 15
  },
  noEventText: {
    fontSize: 16,
    fontWeight: "200",
    margin: 20
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15
  },
  eventListView: {
    backgroundColor: "#fff"
  }
});
