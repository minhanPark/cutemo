import { handleActions } from "redux-actions";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api/memos";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";

const WRITE_MEMO = "write/WRITE_MEMO";
const WRITE_MEMO_SUCCESS = "write/WRITE_MEMO_SUCCESS";
const WRITE_MEMO_FAILURE = "write/WRITE_MEMO_FAILURE";

export const initialize = () => ({
  type: INITIALIZE,
});

export const changeField = (payload) => ({
  type: CHANGE_FIELD,
  payload,
});

export const writeMemo = ({ title, body }) => async (dispatch) => {
  startLoading(WRITE_MEMO);
  dispatch({ type: WRITE_MEMO });
  try {
    const response = await api.writeMemo({ title, body });
    console.log("write responsive is", response);
    dispatch({ type: WRITE_MEMO_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: WRITE_MEMO_FAILURE, payload: e });
  }
  finishLoading(WRITE_MEMO);
  dispatch({ type: WRITE_MEMO });
};

const initialState = {
  title: "",
  body: "",
  memo: null,
  memoError: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_MEMO]: (state) => ({
      ...state,
      memo: null,
      memoError: null,
    }),
    [WRITE_MEMO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      memo: data.memo,
    }),
    [WRITE_MEMO_FAILURE]: (state, { payload: memoError }) => ({
      ...state,
      memoError,
    }),
  },
  initialState
);

export default write;
