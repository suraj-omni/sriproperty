import {
  SET_ERRORS,
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loadinguser: false,
  loadingupdateuser: false,
  credentials: {},
  loadingupdateuser: false,
  loadinguploeaduserimage: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loadinguser: false,
        loadinguploeaduserimage: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loadinguser: true,
        loadinguploeaduserimage: true,
      };
    default:
      return state;
  }
}
