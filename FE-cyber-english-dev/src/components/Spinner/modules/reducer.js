import * as ActionType from "./constant";

let initialState = {
  count: 0,
  isLoading: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_SPINNER_STARTED:
      if (++state.count === 1)
        state.isLoading = true;
      return { ...state };
    case ActionType.REQUEST_SPINNER_ENDED:
      if (state.count === 0 || --state.count === 0)
        state.isLoading = false;
      return { ...state };
    case ActionType.REQUEST_RESET_SPINNER:
      state.isLoading = false;
      state.count = 0;
      return { ...state };
    default:
      return { ...state };
  }
};

export default spinnerReducer;
