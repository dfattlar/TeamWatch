import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import WatchScreen from "./WatchScreen";
import AthletesScreen from "./AthletesScreen";
import AddAthleteScreen from "./AthletesScreen/AddAthleteScreen";
import EventsScreen from "./EventsScreen";
import EventDetailScreen from "./EventsScreen/EventDetailScreen";

const WatchStack = createStackNavigator({
  Watch: { screen: WatchScreen }
});

const AthletesStack = createStackNavigator({
  Athletes: { screen: AthletesScreen },
  AddAthlete: { screen: AddAthleteScreen }
});

const EventsStack = createStackNavigator({
  Events: { screen: EventsScreen },
  EventDetail: { screen: EventDetailScreen }
});

export default createBottomTabNavigator({
  Watch: WatchStack,
  Athletes: AthletesStack,
  Events: EventsStack
});
