import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";

import userreducer from "./reducers/userreducer";
import uireducer from "./reducers/uireducer";
import adreducer from "./reducers/adreducer";
import datareducer from "./reducers/datareducer";
import searchreducer from "./reducers/searchreducer";

const initialState = {};
const middleware = [thunk];
//const persistedState = loadState();

const reducers = combineReducers({
  user: userreducer,
  data: datareducer,
  UI: uireducer,
  ad: adreducer,
  search: searchreducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState({ advert: store.getState().ad.advert });
  //console.log("state change", store.getState().ad.advert);
});

export default store;
