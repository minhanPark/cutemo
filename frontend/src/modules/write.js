import { handleActions } from "redux-actions";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";

export const initialize = () => ({
  type: INITIALIZE,
});

export const changeField = (payload) => ({
  type: CHANGE_FIELD,
  payload,
});

const initialState = {
  title: "",
  body: "",
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
  },
  initialState
);

export default write;
