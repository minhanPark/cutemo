import { handleActions } from "redux-actions";
import * as api from "../lib/api/auth";
import { startLoading, finishLoading } from "./loading";

const TEMP_SET_USER = "user/TEMP_SET_USER";
const CHECK = "user/CHECK";
const CHECK_SUCCESS = "user/CHECK_SUCCESS";
const CHECK_FAILURE = "user/CHECK_FAILURE";
const LOGOUT = "user/LOGOUT";

export const tempSetUser = (payload) => ({
  type: TEMP_SET_USER,
  payload,
});

export const check = () => async (dispatch) => {
  startLoading(CHECK);
  try {
    const response = await api.check();
    console.log("check response is", response.data);
    dispatch({ type: CHECK_SUCCESS, payload: response.data.user });
  } catch (e) {
    console.log(e);
    dispatch({ type: CHECK_FAILURE, payload: e });
    finishLoading(CHECK);
  }
};

function checkFailure() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("localStorage is not working");
  }
}

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => {
      checkFailure();
      return {
        ...state,
        user: null,
        checkError: error,
      };
    },
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState
);
