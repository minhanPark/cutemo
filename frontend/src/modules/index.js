import { combineReducers } from "redux";
import auth from "./auth";
import loading from "./loading";
import user from "./user";
import write from "./write";
import memo from "./memo";
import memos from "./memos";

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  memo,
  memos,
});

export default rootReducer;
