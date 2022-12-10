import * as ActionType from "./constant";


export const actRequestStarted = () => {
  return {
    type: ActionType.REQUEST_SPINNER_STARTED,
  };
};

export const actRequestEnded = () => {
  return {
    type: ActionType.REQUEST_SPINNER_ENDED,
  };
};

export const actResetSpinner = () => {
  return {
    type: ActionType.REQUEST_RESET_SPINNER,
  };
};

