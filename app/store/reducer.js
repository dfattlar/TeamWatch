import { combineReducers } from "redux";

import session from "./session";
import watch from "./watch";

export default combineReducers({
  session,
  watch
});
