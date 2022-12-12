import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import auth, { lessonsReducer } from "./reducer/authReducer";
import spinnerReducer from "../components/Spinner/modules/reducer";

const rootReducer = combineReducers({
  auth,
  lessonsReducer,
  spinnerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
