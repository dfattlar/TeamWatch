import { StackNavigator } from "react-navigation";

import WatchScreen from "./WatchScreen";

const routeConfig = {
  Watch: { screen: WatchScreen }
};

export default StackNavigator(routeConfig);
