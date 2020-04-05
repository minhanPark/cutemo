import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api/auth";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

// export const changeField = createAction(
//   CHANGE_FIELD,
//   ({ form, key, value }) => ({
//     form,
//     key,
//     value,
//   })
// );

export const changeField = (payload) => ({
  type: CHANGE_FIELD,
  payload,
});

//export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const initializeForm = (payload) => ({ type: INITIALIZE_FORM, payload });

export const register = ({ username, password }) => async (dispatch) => {
  // 뭘해야할까?
  // 들어오는 값은 payload = {usename, password};
  // 일단은 REGISTER로 요청을 시작한 것을 알린다.
  startLoading(REGISTER);
  try {
    const response = await api.register({ username, password });
    console.log("response is", response);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: REGISTER_FAILURE, payload: e });
  }
  finishLoading(REGISTER);
  // try 문을 실행한다
  // api 요청을 한다.
  // 성공했다는 요청을 날리고 데이터를 state에 추가한다.
  // try 문에 실패했다고 뜨면 실패했다고 알리고 또 에러 데이터를 날린다.
};

export const login = ({ username, password }) => async (dispatch) => {
  startLoading(LOGIN);
  try {
    const response = await api.login({ username, password });
    console.log("response data is", response.data);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: REGISTER_FAILURE, payload: e });
  }
  finishLoading(LOGIN);
};

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
