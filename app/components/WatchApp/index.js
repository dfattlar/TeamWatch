import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import WatchScreen from './WatchScreen';
import AthletesScreen from './AthletesScreen';
import AddAthleteScreen from './AthletesScreen/AddAthleteScreen';
import EventsScreen from './EventsScreen';
import EventDetailScreen from './EventsScreen/EventDetailScreen';

const WatchStack = createStackNavigator({
  Watch: {screen: WatchScreen},
});

const AthletesStack = createStackNavigator({
  Athletes: {screen: AthletesScreen},
  AddAthlete: {screen: AddAthleteScreen},
});

const EventsStack = createStackNavigator({
  Events: {screen: EventsScreen},
  EventDetail: {screen: EventDetailScreen},
});

export default createAppContainer(
  createBottomTabNavigator({
    Watch: WatchStack,
    Athletes: AthletesStack,
    Events: EventsStack,
  }),
);
