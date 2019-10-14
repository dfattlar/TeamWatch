import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const routeConfigs = {
  Login: {
    screen: LoginForm,
  },
  SignUp: {
    screen: SignUpForm,
  },
};

const tabBarOptions = {
  tabBarPosition: 'bottom',
};

export default createAppContainer(
  createBottomTabNavigator(routeConfigs, tabBarOptions),
);
