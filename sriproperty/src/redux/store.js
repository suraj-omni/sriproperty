import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userreducer from "./reducers/userreducer";
import uireducer from "./reducers/uireducer";
import adreducer from "./reducers/adreducer";
import datareducer from "./reducers/datareducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userreducer,
  data: datareducer,
  UI: uireducer,
  ad: adreducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    /* ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export default store;
