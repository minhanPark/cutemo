import { handleActions } from "redux-actions";
import * as api from "../lib/api/memos";
import { startLoading, finishLoading } from "./loading";

const READ_LISTS = "memos/READ_LISTS";
const READ_LISTS_SUCCESS = "memos/READ_LISTS_SUCCESS";
const READ_LISTS_FAILURE = "memos/READ_LISTS_FAILURE";

export const readLists = ({ page }) => async (dispatch) => {
  startLoading(READ_LISTS);
  try {
    const response = await api.readList({ page });
    console.log("readList response is", response);
    dispatch({ type: READ_LISTS_SUCCESS, payload: response });
  } catch (e) {
    console.log(e);
    dispatch({ type: READ_LISTS_FAILURE, payload: e });
  }
  finishLoading(READ_LISTS);
};

const initialState = {
  memos: null,
  error: null,
};

const memos = handleActions(
  {
    [READ_LISTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      memos: response.data.memos,
    }),
    [READ_LISTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default memos;
