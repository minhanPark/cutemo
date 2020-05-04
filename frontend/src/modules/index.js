import { combineReducers } from "redux";
import auth from "./auth";
import loading from "./loading";
import user from "./user";
import write from "./write";
import memo from "./memo";

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  memo,
});

export default rootReducer;
