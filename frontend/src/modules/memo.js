import { handleActions } from "redux-actions";
import * as api from "../lib/api/memos";
import { startLoading, finishLoading } from "./loading";

const READ_MEMO = "memo/READ_MEMO";
const READ_MEMO_SUCCESS = "memo/READ_MEMO_SUCCESS";
const READ_MEMO_FAILURE = "memo/READ_MEMO_FAILURE";

const UNLOAD_MEMO = "memo/UNLOAD_MEMO";

export const readMemo = ({ id }) => async (dispatch) => {
  startLoading(READ_MEMO);
  try {
    const response = await api.readPost({ id });
    console.log("memo response is", response);
    // response의 어떤 부분이 들어가는 지 확인
    dispatch({ type: READ_MEMO_SUCCESS, payload: response });
  } catch (e) {
    console.log(e);
    dispatch({ type: READ_MEMO_FAILURE, payload: e });
  }
  finishLoading(READ_MEMO);
};

export const unloadMemo = () => ({
  type: UNLOAD_MEMO,
});

const initialState = {
  post: null,
  error: null,
};

const memo = handleActions(
  {
    [READ_MEMO_SUCCESS]: (state, { payload: memo }) => ({
      ...state,
      memo,
    }),
    [READ_MEMO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_MEMO]: () => initialState,
  },
  initialState
);

export default memo;
